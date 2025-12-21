<div align="center">

# 🛣️ Discord Enterprise App Routers Services

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/aether-mailer/blob/main/LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

**🔧 Centralized Router Utilities for Aether Mailer Ecosystem**

Core routing utilities and configurations used across the Aether Mailer monorepo architecture.

[🚀 Quick Start](#-quick-start) • [📋 Usage](#-usage) • [🛠️ Development](#️-development) • [📁 Architecture](#-architecture)

</div>

---

## 🌟 What is Aether Mailer Routers?

**Aether Mailer Routers** provides centralized routing utilities and configurations for the Aether Mailer ecosystem. This package ensures consistent routing patterns across all services in the monorepo.

### 🎯 Key Features

- **Centralized Configuration** - Single source of truth for routing utilities
- **TypeScript Support** - Full type safety with strict mode
- **Monorepo Integration** - Seamless integration with pnpm workspaces
- **Extensible Design** - Easy to extend for new routing patterns
- **Performance Optimized** - Lightweight and efficient routing utilities

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** 9.0.0 or higher
- **TypeScript** 5.0.0 or higher

### 🔧 Installation

```bash
# Install within the monorepo
pnpm add @aether-mailer/routers

# Install globally (for CLI usage)
pnpm add -g @aether-mailer/routers
```

### 🎯 Basic Usage

```typescript
import { initializeRouters } from "@aether-mailer/routers";

// Initialize router configurations
await initializeRouters();
```

---

## 📋 Usage

### 🛠️ Development Scripts

```bash
# Development
pnpm dev                  # Start development server with hot reload
pnpm build               # Build the package for production
pnpm start               # Start the built package
pnpm typecheck           # Run TypeScript type checking
pnpm lint                # Run ESLint
pnpm lint:fix            # Fix ESLint issues automatically
```

### 🏗️ Integration Examples

```typescript
// Basic router initialization
import { initializeRouters } from "@aether-mailer/routers";

async function setupApplication() {
  // Initialize all router configurations
  await initializeRouters();

  console.log("✅ Routers initialized successfully");
}

// In Express.js applications
import express from "express";
import { setupExpressRouters } from "@aether-mailer/routers";

const app = express();
await setupExpressRouters(app);

// In Next.js applications
import { setupNextRouters } from "@aether-mailer/routers";

export default async function setupApp() {
  await setupNextRouters();
}
```

---

## 🛠️ Development

### 📁 Project Structure

```
routers/
├── src/
│   ├── init.ts          # Router initialization logic
│   ├── index.ts         # Main entry point
│   ├── types/           # TypeScript definitions
│   └── utils/           # Router utilities
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

### 🎯 Development Workflow

```bash
# Start development
make dev-routers         # Start routers in development mode

# Build and test
make build-routers       # Build the routers package
make lint-routers        # Lint the routers code
make typecheck-routers   # Type check the routers code
```

### 🔧 Code Quality Standards

- **TypeScript Strict Mode** - All code must pass strict type checking
- **ESLint Configuration** - Follow project linting rules
- **Conventional Commits** - Use standardized commit messages
- **Documentation** - Maintain comprehensive API documentation

---

## 📁 Architecture

### 🏗️ Package Architecture

```
@aether-mailer/routers
├── 🔧 Core Utilities
│   ├── initializeRouters()    # Main initialization function
│   ├── setupExpressRouters()  # Express.js router setup
│   └── setupNextRouters()     # Next.js router setup
├── 📝 Type Definitions
│   ├── RouterConfig           # Configuration interfaces
│   ├── RouteOptions           # Route option types
│   └── MiddlewareConfig       # Middleware configuration
└── 🛠️ Helper Functions
    ├── validateRoutes()       # Route validation utilities
    ├── optimizeRoutes()       # Route optimization helpers
    └── debugRoutes()          # Debug utilities
```

### 🔄 Integration Flow

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Application   │    │   Aether Routers  │    │   Services      │
│   (Express/Next)│◄──►│   (Core Package)  │◄──►│   (API/CLI)     │
│  Entry Points    │    │  Configuration    │    │  Endpoints      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
          │                       │                       │
          ▼                       ▼                       ▼
    Route Definitions      Router Utilities      Service Integration
    Middleware Setup       Type Definitions      API Endpoints
```

---

## 📊 API Reference

### 🔧 Core Functions

#### `initializeRouters(): Promise<void>`

Initializes all router configurations and sets up routing utilities.

**Returns:** `Promise<void>` - Resolves when initialization is complete

**Example:**

```typescript
await initializeRouters();
console.log("Routers ready");
```

#### `setupExpressRouters(app: Express): Promise<void>`

Sets up Express.js specific routing configurations.

**Parameters:**

- `app: Express` - Express application instance

**Example:**

```typescript
import express from "express";
import { setupExpressRouters } from "@aether-mailer/routers";

const app = express();
await setupExpressRouters(app);
```

#### `setupNextRouters(): Promise<void>`

Sets up Next.js specific routing configurations.

**Example:**

```typescript
import { setupNextRouters } from "@aether-mailer/routers";

export default async function setup() {
  await setupNextRouters();
}
```

### 📝 Type Definitions

```typescript
interface RouterConfig {
  basePath?: string;
  middleware?: MiddlewareConfig[];
  routes?: RouteOptions[];
}

interface RouteOptions {
  path: string;
  method: HttpMethod;
  handler: RouteHandler;
  middleware?: MiddlewareConfig[];
}

interface MiddlewareConfig {
  name: string;
  options?: Record<string, any>;
}
```

---

## 🔗 Dependencies

### 📦 Core Dependencies

- **Node.js**: >=18.0.0
- **TypeScript**: ^5.7.3
- **ESLint**: ^9

### 🔗 Monorepo Integration

- **@aether-mailer/server** - Express.js API server
- **@aether-mailer/app** - Next.js frontend application
- **@aether-mailer/cli** - Command-line interface tools

---

## 🤝 Contributing

We welcome contributions to the routers package! Whether you're fixing bugs, adding features, or improving documentation, there's a place for you.

### 🎯 How to Contribute

1. **Fork the repository** and create a feature branch
2. **Make your changes** following our code standards
3. **Test thoroughly** in the monorepo environment
4. **Run quality checks** with `make lint-routers` and `make typecheck-routers`
5. **Submit a pull request** with clear description

### 🏗️ Areas Needing Help

- **Route Optimization** - Performance improvements for routing utilities
- **Type Safety** - Enhanced TypeScript definitions
- **Documentation** - API docs and usage examples
- **Testing** - Unit and integration tests
- **Middleware** - Additional middleware utilities

---

## 📞 Support & Community

### 💬 Get Help

- 📖 **[Documentation](../docs/)** - Comprehensive guides
- 🐛 **[GitHub Issues](https://github.com/skygenesisenterprise/aether-mailer/issues)** - Bug reports and feature requests
- 💡 **[GitHub Discussions](https://github.com/skygenesisenterprise/aether-mailer/discussions)** - General questions

### 🐛 Reporting Issues

When reporting bugs, please include:

- Clear description of the problem
- Steps to reproduce
- Environment information
- Error logs or stack traces
- Expected vs actual behavior

---

## 📊 Package Status

| Feature                    | Status         | Notes                               |
| -------------------------- | -------------- | ----------------------------------- |
| **Core Initialization**    | ✅ Working     | `initializeRouters()` functional    |
| **Express.js Integration** | 🔄 In Progress | `setupExpressRouters()` development |
| **Next.js Integration**    | 📋 Planned     | `setupNextRouters()` planned        |
| **Type Safety**            | ✅ Working     | Full TypeScript support             |
| **Documentation**          | ✅ Working     | Complete API reference              |
| **Testing Suite**          | 📋 Planned     | Unit and integration tests          |

---

## 📄 License

This package is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

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

- **Sky Genesis Enterprise** - Project leadership and development
- **TypeScript Team** - Excellent type system
- **Node.js Community** - Robust runtime environment
- **pnpm** - Fast, efficient package manager
- **Open Source Community** - Tools and inspiration

---

<div align="center">

### 🚀 **Building Better Routing for Aether Mailer!**

[⭐ Star This Repo](https://github.com/skygenesisenterprise/aether-mailer) • [🐛 Report Issues](https://github.com/skygenesisenterprise/aether-mailer/issues) • [💡 Start a Discussion](https://github.com/skygenesisenterprise/aether-mailer/discussions)

---

**🔧 Part of the Aether Mailer Monorepo Ecosystem**

**Made with ❤️ by the [Sky Genesis Enterprise](https://skygenesisenterprise.com) team**

_Building centralized routing utilities for modern mail server infrastructure_

</div>
