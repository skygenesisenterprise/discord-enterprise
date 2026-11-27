# Discord Enterprise — developer & operator interface.
#
# This repository contains one bot (`bot/`), one shared framework
# (`packages/discord-framework/`), the server package, the docs and the root
# Docker stack (Dockerfile + docker-compose.yml + entrypoint.sh). This Makefile
# is a thin wrapper over those files only: no other product, edition or bot is
# addressed here.
#
#   make help

SHELL := /bin/bash
.DEFAULT_GOAL := help

# --- Tools ------------------------------------------------------------------
PNPM ?= pnpm
COMPOSE ?= docker compose
DOCKER ?= docker
NODE ?= node

# --- Images -----------------------------------------------------------------
# IMAGE is the published name of the single bot. VERSION is the tag consumed by
# Compose / `image-pull`; IMAGE_VERSION is the tag used by local builds.
REGISTRY ?= ghcr.io/skygenesisenterprise
IMAGE := $(REGISTRY)/discord-enterprise
VERSION ?= latest
APP_VERSION := $(shell $(NODE) -p "require('./bot/package.json').version" 2>/dev/null || echo 0.0.0)
IMAGE_VERSION ?= v$(APP_VERSION)
GIT_SHA := $(shell git rev-parse --short HEAD 2>/dev/null || echo dev)
LOCAL_TAGS := $(IMAGE):$(IMAGE_VERSION) $(IMAGE):sha-$(GIT_SHA) $(IMAGE):latest

COMPOSE_ENV = DISCORD_ENTERPRISE_BOT_IMAGE=$(IMAGE) DISCORD_ENTERPRISE_BOT_VERSION=$(IMAGE_VERSION) DISCORD_ENTERPRISE_VERSION=$(IMAGE_VERSION) NODE_ENV=production
COMPOSE_ENV_DEV = DISCORD_ENTERPRISE_BOT_IMAGE=$(IMAGE)-dev DISCORD_ENTERPRISE_BOT_VERSION=$(IMAGE_VERSION) DISCORD_ENTERPRISE_VERSION=$(IMAGE_VERSION) NODE_ENV=development

.PHONY: help deps test test-framework test-bot test-docs lint \
        docs-dev docs-build docs-check docs-generate \
        docker-build docker-up docker-down docker-restart docker-logs docker-ps docker-config docker-dev \
        image-tags image-build image-pull image-push image-inspect \
        install doctor update clean

# ---------------------------------------------------------------------------
# Help
# ---------------------------------------------------------------------------
help: ## Show this help
	@echo "Discord Enterprise — available commands:"
	@echo ""
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Image:   $(IMAGE)"
	@echo "Local:   $(LOCAL_TAGS)"
	@echo "Pulled:  $(IMAGE):$(VERSION)"
	@echo ""
	@echo "Examples:  make deps                 # install the workspace dependencies"
	@echo "           make test                 # framework + documentation tests"
	@echo "           make docker-up            # build and start the bot"
	@echo "           make docker-dev           # same bot, hot-reloading sources"

# ---------------------------------------------------------------------------
# Host toolchain
# ---------------------------------------------------------------------------
deps: ## Install the workspace dependencies (pnpm install)
	$(PNPM) install

test: test-framework test-docs ## Run the tests that the workspace provides

test-framework: ## Run the shared framework tests
	$(NODE) --disable-warning=ExperimentalWarning --test packages/discord-framework/test/*.test.js

test-bot: ## Run the bot tests (requires the bot's own dependencies)
	$(NODE) --disable-warning=ExperimentalWarning --test bot/test/*.test.js

test-docs: ## Run the documentation tooling tests (requires deps)
	$(NODE) --test scripts/docs/tests/*.test.mjs

lint: ## Lint the workspace (pnpm lint)
	$(PNPM) lint

docs-dev: ## Run the documentation site locally
	$(PNPM) --filter @discord-enterprise/docs run dev

docs-build: ## Build the documentation site
	$(PNPM) --filter @discord-enterprise/docs run build:docs
	$(PNPM) --filter @discord-enterprise/docs run build

docs-check: ## Validate the documentation against the implementation
	$(NODE) scripts/docs/cli.mjs check

docs-generate: ## Regenerate managed documentation regions
	$(NODE) scripts/docs/cli.mjs generate

# ---------------------------------------------------------------------------
# Docker — the bot uses the root Compose file and the root Dockerfile.
# The container holds one process and one named data volume; no Redis, no
# database service, no platform edition.
# ---------------------------------------------------------------------------
install: ## Create the root .env from .env.example (if missing) and start the bot
	@test -f .env || { cp .env.example .env; echo "==> .env created at the repository root — fill in the credentials, then re-run"; exit 1; }
	@$(MAKE) docker-up

docker-build: ## Build the bot image with the local tags
	@echo "==> building $(IMAGE) version=$(IMAGE_VERSION) sha=$(GIT_SHA)"
	$(DOCKER) buildx build --file Dockerfile \
		--build-arg DISCORD_ENTERPRISE_VERSION=$(IMAGE_VERSION) \
		$(foreach tag,$(LOCAL_TAGS),-t $(tag)) --load .

docker-up: ## Build and start the bot in the background
	@echo "==> starting $(IMAGE):$(IMAGE_VERSION)"
	$(COMPOSE_ENV) $(COMPOSE) up -d --build

docker-down: ## Stop the bot (the data volume is preserved)
	@echo "==> stopping the bot (data volume preserved)"
	$(COMPOSE) down --remove-orphans --timeout 15

docker-restart: ## Restart the bot without rebuilding
	$(COMPOSE_ENV) $(COMPOSE) restart

docker-logs: ## Follow the bot logs (optionally: make docker-logs SERVICE=discord-enterprise)
	@if [ -n "$(SERVICE)" ]; then \
		$(COMPOSE) logs -f $(SERVICE); \
	else \
		$(COMPOSE) logs -f; \
	fi

docker-ps: ## Show the bot container status
	$(COMPOSE) ps -a

docker-config: ## Validate and print the resolved Compose configuration
	$(COMPOSE_ENV) $(COMPOSE) config

docker-dev: ## Run the bot in development mode with hot reload
	@echo "==> starting $(IMAGE)-dev in development mode"
	$(COMPOSE_ENV_DEV) $(COMPOSE) up --build --watch

# ---------------------------------------------------------------------------
# Images — same tags as a release, built locally from the root Dockerfile.
# ---------------------------------------------------------------------------
image-tags: ## Print the local image tags
	@printf '%s\n' $(LOCAL_TAGS)

image-build: docker-build ## Alias of docker-build

image-pull: ## Pull the published bot image
	$(DOCKER) pull $(IMAGE):$(VERSION)

image-push: ## Push the local tags (docker login first)
	@for tag in $(LOCAL_TAGS); do \
		echo "==> pushing $$tag"; \
		$(DOCKER) push "$$tag" || exit 1; \
	done

image-inspect: ## Inspect the locally built image
	$(DOCKER) image inspect \
		--format 'id={{.Id}}{{"\n"}}tags={{.RepoTags}}{{"\n"}}labels={{json .Config.Labels}}' \
		$(firstword $(LOCAL_TAGS))

# ---------------------------------------------------------------------------
# Operations
# ---------------------------------------------------------------------------
doctor: ## Check the local installation
	@echo "Discord Enterprise doctor"
	@command -v docker >/dev/null 2>&1 && echo "✓ Docker" || echo "✗ Docker missing"
	@docker compose version >/dev/null 2>&1 && echo "✓ Docker Compose" || echo "✗ Docker Compose missing"
	@docker buildx version >/dev/null 2>&1 && echo "✓ Docker Buildx" || echo "✗ Docker Buildx missing"
	@test -f Dockerfile && test -f docker-compose.yml && test -f entrypoint.sh && echo "✓ Docker stack files" || echo "✗ Docker stack files missing"
	@test -f .env && echo "✓ root .env exists" || echo "✗ root .env missing (make install)"
	@$(COMPOSE) ps -a 2>&1 | tail -5

update: ## Pull the latest revision and restart the bot
	git pull
	@$(MAKE) docker-up

clean: ## Remove local build artifacts
	rm -rf docs/.next docs/.source packages/*/dist
	find . -name '*.tsbuildinfo' -not -path './node_modules/*' -delete
