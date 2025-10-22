# @1inch/sdks - Multi-Language SDKs Monorepo

This repository contains a collection of 1inch Protocol SDKs for various programming languages, managed with NX monorepo tooling.

## 📁 Project Structure

```
sdks/
├── typescript/          # TypeScript SDKs
│   ├── aqua/           # Aqua Protocol SDK
│   ├── cross-chain/    # Cross-chain Protocol SDK
│   ├── fusion/         # Fusion Protocol SDK
│   └── limit-order/    # Limit Order Protocol SDK
├── java/               # Java SDKs (future)
└── python/             # Python SDKs (future)
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install
```

## 📦 Available SDKs

### TypeScript SDKs

#### @1inch/aqua-sdk
SDK for interacting with the 1inch Aqua Protocol.

```bash
# Using npm scripts from root
pnpm aqua:build     # Build the SDK
pnpm aqua:test      # Run tests
pnpm aqua:lint      # Run linter

# Or using NX directly
pnpm nx build aqua
pnpm nx test aqua
pnpm nx lint aqua
```

#### @1inch/cross-chain-sdk
SDK for 1inch Cross-chain Protocol operations.

```bash
# Using npm scripts from root
pnpm cross-chain:build     # Build the SDK
pnpm cross-chain:test      # Run tests
pnpm cross-chain:lint      # Run linter

# Or using NX directly
pnpm nx build cross-chain
pnpm nx test cross-chain
pnpm nx lint cross-chain
```

#### @1inch/fusion-sdk
SDK for 1inch Fusion Protocol operations.

```bash
# Using npm scripts from root
pnpm fusion:build     # Build the SDK
pnpm fusion:test      # Run tests
pnpm fusion:lint      # Run linter

# Or using NX directly
pnpm nx build fusion
pnpm nx test fusion
pnpm nx lint fusion
```

#### @1inch/limit-order-sdk
SDK for 1inch Limit Order Protocol operations.

```bash
# Using npm scripts from root
pnpm limit-order:build     # Build the SDK
pnpm limit-order:test      # Run tests
pnpm limit-order:lint      # Run linter

# Or using NX directly
pnpm nx build limit-order
pnpm nx test limit-order
pnpm nx lint limit-order
```

## 🛠️ Development

### Common Commands

```bash
# Build all projects
pnpm build

# Run tests for all projects
pnpm test

# Lint all projects
pnpm lint

# Show dependency graph
pnpm nx graph

# Build affected projects only
pnpm affected:build

# Test affected projects only
pnpm affected:test

# Lint affected projects only
pnpm affected:lint

# Format code
pnpm format

# Check format
pnpm format:check

# Clean all build artifacts
pnpm clean

# Reset NX cache
pnpm reset
```

### Working with NX

This monorepo uses NX for task orchestration and caching. Key features:

- **Smart rebuilds**: Only rebuilds what has changed
- **Task caching**: Caches build outputs for faster subsequent builds
- **Dependency graph**: Visualize project dependencies with `pnpm nx graph`
- **Affected commands**: Run tasks only for affected projects

### Individual Package Scripts

Each SDK package also has its own npm scripts in `package.json` for:
- `build` - Build ESM, CJS, and TypeScript types
- `test` - Run Jest tests
- `lint` - Run ESLint
- `format` - Format with Prettier
- `type-check` - TypeScript type checking
- `clean` - Clean build artifacts

### ESLint Configuration

This monorepo uses the standard `@1inch/eslint-config` for consistent code style across all SDKs.

## 🏗️ Architecture

The monorepo is designed to support multiple programming languages:

- **TypeScript**: Modern JavaScript/TypeScript SDKs with full type safety
- **Python**: Python SDKs for data science and backend integrations (coming soon)
- **Java**: Enterprise Java SDKs (coming soon)

Each language has its own toolchain and build process, unified under NX orchestration.

## 📝 License

MIT