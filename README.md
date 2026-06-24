<div align="center">

# Discord Enterprise App

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/discord-enterprise/blob/main/LICENSE) [![Go](https://img.shields.io/badge/Go-1.25+-blue?style=for-the-badge&logo=go)](https://golang.org/) [![Gin](https://img.shields.io/badge/Gin-1.11+-lightgrey?style=for-the-badge&logo=go)](https://gin-gonic.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/) [![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/) [![Discord](https://img.shields.io/badge/discord.js-14-5865F2?style=for-the-badge&logo=discord)](https://discord.js.org/)

**Complete Full-Stack Enterprise Orchestration Platform — Discord Bot, Web Dashboard, CLI Console, Email Suite, and Infrastructure Management**

A next-generation enterprise management platform featuring a **Discord bot for guild administration**, a **Next.js web dashboard**, a **Go Gin REST API**, a **PostgreSQL-backed email suite** (IMAP/SMTP/POP3), an **OPNsense-style CLI console (vaultctl)**, and a **comprehensive infrastructure stack** — all unified in a pnpm monorepo.

[🚀 Quick Start](#-quick-start) • [📋 What's New](#-whats-new) • [📊 Current Status](#-current-status) • [🛠️ Tech Stack](#️-tech-stack) • [📁 Architecture](#-architecture) • [🤝 Contributing](#-contributing)

[![GitHub stars](https://img.shields.io/github/stars/skygenesisenterprise/discord-enterprise?style=social)](https://github.com/skygenesisenterprise/discord-enterprise/stargazers) [![GitHub forks](https://img.shields.io/github/forks/skygenesisenterprise/discord-enterprise?style=social)](https://github.com/skygenesisenterprise/discord-enterprise/network) [![GitHub issues](https://img.shields.io/github/issues/skygenesisenterprise/discord-enterprise)](https://github.com/skygenesisenterprise/discord-enterprise/issues)

</div>

---

## 🌟 What is Discord Enterprise?

**Discord Enterprise** is a full-stack, multi-platform orchestration platform built by **Sky Genesis Enterprise**. It unifies Discord guild management, web administration, API services, email infrastructure, CLI system administration, and enterprise deployment — all within a single monorepo.

### 🎯 Vision

- **🤖 Discord Bot** — Slash-command driven guild management with discord.js v14
- **🌐 Web Dashboard** — Next.js 16 + React 19 with shadcn/ui, i18n, and Fumadocs documentation
- **⚙️ Go REST API** — High-performance Gin framework backend with GORM + PostgreSQL
- **📧 Email Suite** — Complete IMAP/SMTP/POP3 stack with OAuth (Google, Microsoft, Proton)
- **🖥️ CLI Console (vaultctl)** — OPNsense-style interactive system management for Linux appliances
- **🏗️ Enterprise Infrastructure** — Docker, Kubernetes, Terraform, Redis, Prometheus/Grafana
- **🔐 Enterprise Security** — JWT auth, OAuth, RBAC, rate limiting, audit logging, MFA
- **📚 Comprehensive Docs** — Fumadocs MDX documentation with OpenAPI specs and i18n

---

## 🆕 What's New

### 🎯 **Major Features**

#### 🤖 **Discord Bot** (NEW)
- ✅ Slash commands: about, help, ping, rules, serverinfo, status, userinfo
- ✅ Event handling: ready, interactionCreate
- ✅ Automatic guild command deployment
- ✅ ESM JavaScript architecture with discord.js v14

#### 🖥️ **vaultctl CLI Console** (NEW)
- ✅ OPNsense-style interactive menu system
- ✅ System management: status, shutdown, reboot, info
- ✅ Service management with systemd integration
- ✅ Network management: interfaces, IP config, ping diagnostics
- ✅ Security: user management, SSH keys, audit logs
- ✅ Maintenance: backup, update, cleanup, integrity checks
- ✅ Vault integration: status, tokens, seal/unseal
- ✅ PAM authentication and SSH integration

#### 📧 **Email Suite** (NEW)
- ✅ Full IMAP (993), SMTP (587), POP3 (995) implementation
- ✅ Stalwart mail server integration
- ✅ OAuth providers: Google, Microsoft, Proton
- ✅ Complete email database schema: MailAccounts, Mailboxes, Threads, Emails, Recipients, Attachments

#### 🏗️ **Enhanced Architecture** (IMPROVED)
- ✅ pnpm monorepo with 11 workspace packages
- ✅ Go 1.25 + Gin 1.11 backend with GORM + PostgreSQL
- ✅ Next.js 16 + React 19 with App Router and TypeScript 6
- ✅ Prisma 7 schema as source of truth (45+ models, 1267 lines)
- ✅ Docker Compose with 4 services (postgres, api, bot, web)
- ✅ 17 GitHub Actions CI/CD workflows
- ✅ Multi-stage Docker builds + Kubernetes manifests + Terraform

---

## 📊 Current Status

> **✅ Active Development**: From foundation to full enterprise orchestration platform.

### ✅ **Currently Implemented**

#### 🤖 **Discord Bot**
- ✅ Slash command framework with deployment scripts
- ✅ Guild information and moderation commands
- ✅ Event-driven architecture
- ✅ Docker container support

#### 🌐 **Web Dashboard**
- ✅ Next.js 16 with App Router and TypeScript strict mode
- ✅ shadcn/ui component library with 30+ Radix primitives
- ✅ Multi-language i18n support (next-intl)
- ✅ Authentication flow: login, register, MFA, OAuth callbacks
- ✅ Fumadocs documentation system with MDX and OpenAPI
- ✅ Theme system (dark/light with next-themes)
- ✅ Responsive layout with mobile support
- ✅ Route-based auth protection (AuthGuard, ProtectedRoute)

#### ⚙️ **Go REST API**
- ✅ Full REST API at `/api/v1/` with 20+ resource endpoints
- ✅ CRUD for: categories, media, pages, dossiers, services, users, API keys, webhooks, newsletters
- ✅ Status/incident/maintenance management
- ✅ Public endpoints: contact, newsletter, status, pages
- ✅ JWT authentication with OAuth (Google, Microsoft, Proton)
- ✅ Rate limiting, CORS, security headers, CSRF protection
- ✅ Analytics, audit logging, notifications, scheduling
- ✅ Full-text search and file attachments
- ✅ Calendar, meetings, todos services

#### 🖥️ **vaultctl CLI Console**
- ✅ Interactive menu system with ASCII banners
- ✅ System, service, network, security, maintenance actions
- ✅ PAM authentication and session management
- ✅ Systemd integration and MOTD replacement
- ✅ Multi-stage Docker build

#### 🗄️ **Database**
- ✅ Prisma schema with 45+ models (users, orgs, email, CMS, calendar, etc.)
- ✅ GORM integration for Go runtime
- ✅ User roles: USER, EDITOR, ADMIN, OWNER
- ✅ Subscription tiers: FREE, ESSENTIAL, PREMIUM, ENTERPRISE

#### 🏗️ **Infrastructure**
- ✅ Docker Compose (dev + cloud profiles)
- ✅ Kubernetes manifests (deployment, service, configmap, ingress)
- ✅ Redis caching (dev, test, prod)
- ✅ Prometheus + Grafana + Loki monitoring stack
- ✅ Terraform for cloud deployment
- ✅ 17 GitHub Actions workflows
- ✅ Dependabot, CodeQL, semantic release (Changesets)

### 🔄 **In Development**

- **Advanced RBAC** — Fine-grained role-based access control
- **Plugin System** — External action loading for vaultctl
- **Real-Time Monitoring** — Live metrics and logs dashboard
- **Advanced Network Tools** — Firewall and route configuration
- **Web-Based Management Console** — GUI for vaultctl operations
- **Cluster Management** — Multi-node orchestration

### 📋 **Planned Features**

- **Mobile Companion App** — React Native / Capacitor mobile client
- **Advanced Email Security** — Spam filtering, virus scanning, encryption
- **Full Calendar & Contacts Sync** — CalDAV/CardDAV support
- **E2E Testing Suite** — Comprehensive Playwright and Go tests
- **Performance Optimization** — Caching, CDN, edge deployment

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Go** 1.25.0 or higher (for backend + CLI)
- **Node.js** 20.0.0 or higher (for frontend + bot)
- **pnpm** 9.0.0 or higher (recommended package manager)
- **PostgreSQL** 16.0 or higher (for database)
- **Docker** & **Docker Compose** (optional, for containerized deployment)
- **Make** (for command shortcuts)

### 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/skygenesisenterprise/discord-enterprise.git
   cd discord-enterprise
   ```

2. **Install dependencies**

   ```bash
   # Install all workspace dependencies
   pnpm install

   # Generate Prisma client
   pnpm db:generate
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

4. **Database initialization**

   ```bash
   pnpm db:migrate
   pnpm db:seed   # Optional: seed development data
   ```

5. **Start development servers**

   ```bash
   # Start all services (frontend + backend)
   pnpm dev

   # Or start individually:
   pnpm dev:frontend   # Next.js on port 3000
   pnpm dev:backend    # Go API on port 8080
   pnpm dev:cli        # vaultctl CLI
   ```

### 🌐 Access Points

Once running, you can access:

- **Web Dashboard**: [http://localhost:3000](http://localhost:3000)
- **API Server**: [http://localhost:8080](http://localhost:8080)
- **Health Check**: [http://localhost:8080/api/v1/health](http://localhost:8080/api/v1/health)
- **API Documentation**: [http://localhost:3000/docs](http://localhost:3000/docs)
- **Discord Bot**: Configure via `.env` with your bot token
- **Discord Welcome Messages**: Set `DISCORD_WELCOME_CHANNEL_ID` and `DISCORD_ROLE_MEMBER_ID`
  as deployment defaults, then manage each server with `/welcome` and `/goodbye`.
  Messages support `{member}`, `{username}`, `{userTag}`, `{server}`, and `{memberCount}`.
  Use `/welcome panel` to publish the verification panel, `/welcome preview` or
  `/goodbye preview` before activation, and `/member-events` as a global compatibility switch.
- **vaultctl CLI**: `pnpm cli` or `go run ./cmd`

### 🐳 Docker Quick Start

```bash
# Development environment
docker compose -f docker-compose.dev.yml up -d

# Production environment
docker compose -f docker-compose.cloud.yml up -d
```

### 🎯 **Available Commands**

```bash
# 🚀 Development
pnpm dev                 # Start all services (frontend + backend)
pnpm dev:frontend        # Frontend only (port 3000)
pnpm dev:backend         # Backend only (port 8080)
pnpm dev:cli             # vaultctl CLI development

# 🏗️ Building
pnpm build               # Build all workspaces
pnpm start               # Start production servers

# 🗄️ Database
pnpm db:generate         # Generate Prisma client
pnpm db:migrate          # Run migrations
pnpm db:studio           # Open Prisma Studio
pnpm db:seed             # Seed development data

# 🔧 Code Quality
pnpm lint                # Lint all packages
pnpm typecheck           # TypeScript type checking
pnpm format              # Format code with Prettier
pnpm test                # Run all tests

# 🐳 Docker
pnpm docker:build        # Build Docker image
pnpm docker:run          # Start Docker Compose

# 🛠️ CLI
pnpm cli                 # Run vaultctl CLI tool

# 📦 Release
pnpm changeset           # Manage changesets
pnpm clean               # Clean build artifacts
```

---

## 🛠️ Tech Stack

### 🌐 **Frontend Layer**

```
Next.js 16 + React 19.2.6 + TypeScript 6
├── 🎨 Tailwind CSS v4 + shadcn/ui (30+ Radix primitives)
├── 🌍 next-intl (Internationalization)
├── 📚 Fumadocs (MDX Documentation + OpenAPI)
├── 🔐 JWT + OAuth Authentication (Complete Implementation)
├── 🛣️ Next.js App Router (Routing)
├── 🎭 Framer Motion (Animations)
├── 📊 Recharts (Charts & Visualization)
├── 🗃️ Zustand 5 (State Management)
├── 📝 React Hook Form + Zod 4 (Forms & Validation)
└── 🔧 ESLint + Prettier + Stylelint (Code Quality)
```

### ⚙️ **Backend Layer**

```
Go 1.25.5 + Gin Framework 1.11
├── 🗄️ GORM 1.31 + PostgreSQL 16 (Database Layer)
├── 🔐 JWT + OAuth Authentication
├── 📧 IMAP/SMTP/POP3 Services (Stalwart Integration)
├── 🛡️ Middleware (CORS, Rate Limit, Security, CSRF)
├── 📊 Prometheus Metrics
├── 🌐 REST API Routes (/api/v1/)
├── 🔍 Full-Text Search
└── 📋 Structured Logging
```

### 🤖 **Discord Bot Layer**

```
discord.js 14.25.1 (ESM)
├── 💬 Slash Commands (about, help, ping, rules, serverinfo, status, userinfo)
├── 🔄 Event Handlers (ready, interactionCreate)
├── 🚀 Auto Command Deployment
└── 🐳 Docker Ready
```

### 🖥️ **CLI Console Layer (vaultctl)**

```
Go + Cobra CLI Framework
├── 🎯 Interactive OPNsense-Style Menu System
├── ⚙️ System Management (status, shutdown, reboot)
├── 🔧 Service Management (systemd)
├── 🌐 Network Management (interfaces, IP, ping)
├── 🔒 Security Management (users, SSH keys, audit)
├── 🛡️ Maintenance (backup, update, cleanup)
├── 🗄️ Vault Integration (status, tokens, seal/unseal)
├── 🔑 PAM Authentication
└── 🐳 Multi-Stage Docker Support
```

### 🗄️ **Data Layer**

```
PostgreSQL 16 + Prisma 7 + GORM 1.31
├── 🏗️ Prisma Schema (45+ Models, Source of Truth)
├── 🔍 GORM Query Builder (Go Runtime ORM)
├── 🔄 Auto-Migrations (Prisma + GORM)
├── 👥 User Models (Roles: USER, EDITOR, ADMIN, OWNER)
├── 📧 Email Stack (MailAccounts, Mailboxes, Threads, Emails)
├── 📅 Calendar & Events
├── ✅ Todos & Todo Lists
├── 📰 CMS (Categories, Articles, Media, Comments)
└── 📈 Analytics & Audit Logging
```

### 🏗️ **Monorepo Infrastructure**

```
pnpm Workspaces + Go Modules + Docker Compose
├── 📦 app/ (Next.js Frontend - TypeScript)
├── ⚙️ server/ (Go Gin API)
├── 🤖 bot/ (Discord Bot - JavaScript/ESM)
├── 🖥️ cmd/ (vaultctl CLI - Go)
├── 🗂️ prisma/ (Database Schema & Migrations)
├── 🛠️ tools/ (Development Utilities)
├── 🔧 services/ (Core Services - TypeScript)
├── 🗺️ routers/ (API Routing)
├── 🧪 tests/ (Test Suite)
├── 🐳 docker/ (Docker Configuration)
├── 📦 infrastructure/ (K8s, Terraform, Redis, Monitoring)
├── 📚 assets/ (Static Assets)
└── 📖 example/ (Example Content)
```

---

## 📁 Architecture

### 🏗️ **Monorepo Structure**

```
discord-enterprise/
├── app/                        # Next.js 16 Frontend (TypeScript)
│   ├── app/                   # App Router pages
│   │   ├── (auth)/           # Authentication pages
│   │   ├── (docs)/           # Fumadocs documentation
│   │   ├── (platform)/       # Dashboard & platform UI
│   │   └── api/              # API route handlers
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui primitives
│   │   └── ...              # Feature components
│   ├── contexts/            # React contexts (auth, locale, consent)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── styles/              # Tailwind CSS styles
├── server/                    # Go Gin API Backend
│   ├── api/
│   │   └── v1/              # API route handlers
│   │       ├── categories/  # CRUD resources
│   │       ├── users/       # User management
│   │       ├── media/       # Media management
│   │       └── ...          # 20+ resource handlers
│   ├── middleware/          # Gin middleware
│   ├── models/              # GORM models & interfaces
│   ├── services/            # Business logic
│   │   ├── imap/           # IMAP service
│   │   ├── smtp/           # SMTP service
│   │   ├── pop3/           # POP3 service
│   │   ├── oauth/          # OAuth providers
│   │   ├── calendar/       # Calendar service
│   │   └── ...             # Other services
│   └── routes/              # Route definitions
├── bot/                       # Discord Bot (JavaScript/ESM)
│   ├── commands/            # Slash command definitions
│   ├── events/              # Event handlers
│   └── deploy-commands.js   # Command deployment script
├── cmd/                       # vaultctl CLI Console (Go)
│   ├── actions/             # Command actions
│   ├── banners/             # ASCII art banners
│   ├── menus/               # Interactive menu system
│   └── main.go             # Entry point
├── prisma/                    # Database Schema
│   └── schema.prisma        # 45+ models, 1267 lines
├── infrastructure/            # Infrastructure-as-Code
│   ├── docker/              # Docker Compose configs
│   ├── k8s/                 # Kubernetes manifests
│   ├── redis/               # Redis configuration
│   ├── monitoring/          # Prometheus/Grafana/Loki
│   └── terraform/           # Terraform scripts
├── docker/                    # Docker support
├── .github/                   # GitHub configuration
│   └── workflows/           # 17 CI/CD pipelines
└── package.json              # pnpm workspace root
```

### 🔄 **Data Flow Architecture**

```
┌──────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Next.js App     │     │  Go Gin API      │     │  PostgreSQL 16  │
│  (Frontend)      │◄───►│  (Backend)       │◄───►│  (Database)     │
│  Port 3000       │     │  Port 8080       │     │  Port 5432      │
│  TypeScript 6    │     │  Go 1.25         │     │                  │
└──────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                        │
         ▼                       ▼                        ▼
   shadcn/ui UI           REST API /api/v1/         Prisma Schema
   i18n (next-intl)       JWT Auth + OAuth          45+ Models
   Fumadocs Docs          IMAP/SMTP/POP3            GORM ORM
   Zustand State          Calendar/Todos             Auto-migrations
         │                       │
         ▼                       ▼
┌──────────────────┐     ┌──────────────────┐
│  Discord Bot     │     │  vaultctl CLI    │
│  discord.js 14   │     │  Go + Cobra      │
│  Slash Commands  │     │  System Console  │
│  Guild Admin     │     │  OPNsense-Style  │
└──────────────────┘     └──────────────────┘
```

---

## 🗺️ Development Roadmap

### 🎯 **Phase 1: Foundation (✅ Complete)**

- ✅ **Monorepo Setup** — pnpm workspaces + Go modules
- ✅ **Next.js Frontend** — App Router, shadcn/ui, i18n
- ✅ **Go Gin API** — Full REST framework with middleware
- ✅ **Database Schema** — Prisma + GORM, 45+ models
- ✅ **Authentication** — JWT + OAuth (Google, Microsoft, Proton)
- ✅ **Docker Setup** — Multi-container orchestration
- ✅ **CI/CD Pipeline** — 17 GitHub Actions workflows

### 🚀 **Phase 2: Core Features (✅ Complete)**

- ✅ **Discord Bot** — Slash commands, events, guild management
- ✅ **vaultctl CLI** — OPNsense-style interactive system console
- ✅ **Email Suite** — IMAP/SMTP/POP3 with Stalwart integration
- ✅ **Documentation** — Fumadocs MDX with OpenAPI specs
- ✅ **Infrastructure** — K8s, Terraform, Redis, Monitoring
- ✅ **API Resource CRUD** — 20+ endpoints with full admin

### ⚙️ **Phase 3: Enhancement (🔄 In Progress)**

- 🔄 **Advanced RBAC** — Fine-grained permission system
- 🔄 **Plugin System** — Extensible action loading for vaultctl
- 🔄 **Real-Time Monitoring** — Live metrics dashboard
- 🔄 **Web Console** — GUI for vaultctl system management
- 🔄 **Testing Suite** — Comprehensive Playwright + Go tests

### 🌟 **Phase 4: Enterprise (📋 Planned)**

- 📋 **Mobile App** — React Native / Capacitor companion
- 📋 **Email Security** — Spam filtering, virus scanning, encryption
- 📋 **CalDAV/CardDAV** — Calendar and contacts sync
- 📋 **Cluster Management** — Multi-node orchestration
- 📋 **Performance Optimization** — CDN, edge, caching

---

## 💻 Development

### 📋 **Development Workflow**

```bash
# New developer setup
pnpm install && pnpm db:generate && pnpm db:migrate

# Daily development
pnpm dev                 # Start working on both frontend + backend
pnpm dev:frontend        # Frontend-only development
pnpm dev:backend         # Backend-only development
pnpm dev:cli             # CLI development

# Code quality
pnpm lint                # Check code quality
pnpm lint:fix            # Auto-fix linting issues
pnpm typecheck           # Verify TypeScript types
pnpm format              # Format code with Prettier

# Database changes
pnpm db:generate         # Generate Prisma client after schema changes
pnpm db:migrate          # Apply new migrations
pnpm db:studio           # Browse database in Prisma Studio

# Before committing
pnpm format && pnpm lint && pnpm typecheck

# Testing
pnpm test                # Run all tests
pnpm test:e2e            # Run Playwright E2E tests
```

### 🎯 **Docker Commands**

```bash
# Development environment
docker compose -f docker-compose.dev.yml up -d

# Production environment
docker compose -f docker-compose.cloud.yml up -d

# View logs
docker compose logs -f

# Rebuild specific service
docker compose build api
```

### 📋 **Development Guidelines**

- **pnpm Workspaces** — Use workspace-specific dependencies
- **TypeScript Strict Mode** — All frontend code must pass strict checks
- **Go Conventions** — Follow standard Go project layout
- **Conventional Commits** — Standardized commit messages
- **Prisma Source of Truth** — Schema changes start in Prisma
- **API Design** — RESTful endpoints with `/api/v1/` prefix
- **Component Patterns** — shadcn/ui conventions for React components
- **Security First** — Validate all inputs, implement proper auth
- **Error Handling** — Comprehensive error handling and logging

---

## 🤝 Contributing

We're looking for contributors to help build this comprehensive enterprise orchestration platform! Whether you're experienced with Go, TypeScript, Discord bots, CLI tools, email protocols, or DevOps, there's a place for you.

### 🎯 **How to Get Started**

1. **Fork the repository** and create a feature branch
2. **Check the issues** for tasks that need help
3. **Join discussions** about architecture and features
4. **Start small** — Documentation, tests, or minor features
5. **Follow our code standards** and commit guidelines

### 🏗️ **Areas Needing Help**

- **Go Backend** — API endpoints, email services, middleware, security
- **TypeScript Frontend** — React components, UI/UX, dashboard, docs
- **Discord Bot** — New commands, moderation features, event handling
- **vaultctl CLI** — System actions, plugins, network tools
- **Email Protocols** — IMAP, SMTP, POP3 implementation
- **Database** — Schema design, migrations, optimization
- **DevOps** — Docker, K8s, Terraform, CI/CD
- **Security** — Authentication, encryption, penetration testing
- **Documentation** — API docs, user guides, tutorials

---

## 📞 Support & Community

### 💬 **Get Help**

- 📖 **[Documentation](app/app/(docs)/)** — Comprehensive guides and API docs
- 🐛 **[GitHub Issues](https://github.com/skygenesisenterprise/discord-enterprise/issues)** — Bug reports and feature requests
- 💡 **[GitHub Discussions](https://github.com/skygenesisenterprise/discord-enterprise/discussions)** — General questions and ideas
- 📧 **Email** — support@skygenesisenterprise.com

### 🐛 **Reporting Issues**

When reporting bugs, please include:

- Clear description of the problem
- Steps to reproduce
- Environment information (Go version, Node.js version, OS)
- Error logs or screenshots
- Expected vs actual behavior

---

## 📊 Project Status

| Component | Status | Technology | Notes |
|-----------|--------|------------|-------|
| **Web Dashboard** | ✅ Working | Next.js 16 + React 19 + TypeScript 6 | shadcn/ui, i18n, Fumadocs |
| **Go REST API** | ✅ Working | Gin 1.11 + GORM 1.31 | 20+ resource endpoints |
| **Discord Bot** | ✅ Working | discord.js 14 | Slash commands, guild admin |
| **vaultctl CLI** | ✅ Working | Go + Cobra | OPNsense-style console |
| **Database Schema** | ✅ Working | Prisma 7 + PostgreSQL 16 | 45+ models, 1267 lines |
| **Email Suite** | ✅ Working | IMAP/SMTP/POP3 + Stalwart | OAuth: Google, Microsoft, Proton |
| **Authentication** | ✅ Working | JWT + OAuth | Login, register, MFA |
| **Docker Deployment** | ✅ Working | Multi-stage + Compose | Dev + cloud profiles |
| **Kubernetes** | ✅ Working | Manifests + Terraform | Deployment, service, ingress |
| **Monitoring** | ✅ Working | Prometheus + Grafana + Loki | Full observability stack |
| **CI/CD** | ✅ Working | GitHub Actions | 17 workflows |
| **Calendar & Todos** | ✅ Working | Server services | Full CRUD |
| **CMS** | ✅ Working | Categories, Articles, Media | Full content management |
| **Webhooks & API Keys** | ✅ Working | CRUD + admin | Rate limited |
| **Advanced RBAC** | 🔄 In Progress | Go/TS | Fine-grained permissions |
| **Plugin System** | 🔄 In Progress | Go | External action loading |
| **Real-Time Monitoring** | 🔄 In Progress | WebSocket | Live metrics dashboard |
| **Mobile App** | 📋 Planned | Capacitor | iOS/Android companion |
| **Testing Suite** | 📋 Planned | Playwright + Go | E2E + unit tests |

---

## 🏆 Sponsors & Partners

**Development led by [Sky Genesis Enterprise](https://skygenesisenterprise.com)**

We're looking for sponsors and partners to help accelerate development of this open-source enterprise orchestration platform.

[🤝 Become a Sponsor](https://github.com/sponsors/skygenesisenterprise)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Sky Genesis Enterprise

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Sky Genesis Enterprise** — Project leadership and vision
- **Go Community** — High-performance programming language and ecosystem
- **Gin Framework** — Lightweight HTTP web framework
- **GORM Team** — Modern Go database library
- **Next.js Team** — Excellent React framework
- **React Team** — Modern UI library
- **shadcn/ui** — Beautiful component library
- **Prisma Team** — Next-generation ORM
- **discord.js Team** — Powerful Discord API framework
- **Cobra CLI** — Go framework for CLI applications
- **Tailwind CSS** — Utility-first CSS framework
- **Radix UI** — Accessible UI primitives
- **Fumadocs** — Documentation framework
- **PostgreSQL Team** — World's most advanced open-source database
- **Docker Team** — Container platform and tools
- **Kubernetes Community** — Container orchestration
- **Prometheus & Grafana Teams** — Monitoring and observability
- **Terraform Team** — Infrastructure as code
- **pnpm** — Fast, disk space efficient package manager
- **Open Source Community** — Tools, libraries, and inspiration

---

<div align="center">

### 🚀 **Join Us in Building the Future of Enterprise Infrastructure Management!**

[⭐ Star This Repo](https://github.com/skygenesisenterprise/discord-enterprise) • [🐛 Report Issues](https://github.com/skygenesisenterprise/discord-enterprise/issues) • [💡 Start a Discussion](https://github.com/skygenesisenterprise/discord-enterprise/discussions)

---

**🔧 Full-Stack Enterprise Orchestration — Discord Bot, Web Dashboard, CLI Console, Email Suite, and Infrastructure Management**

**Made with ❤️ by the [Sky Genesis Enterprise](https://skygenesisenterprise.com) team**

_Building an enterprise-grade orchestration platform with complete tooling for modern infrastructure management_

</div>
