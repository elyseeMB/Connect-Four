
```markdown
# 🎯 Connect Four Monorepo

A modular monorepo setup for the classic Connect Four game. Built with reusable packages and apps using `pnpm` and `Turborepo`.

## 📦 Structure
```

apps/
├── web/ → Main web client
├── admin/ → Admin dashboard
├── console/ → (Optional) CLI version

packages/
├── ui/ → Shared UI components (with Storybook)
├── game-logic/ → Game rules and state machine
├── types/ → Shared TypeScript types
├── utils/ → General utility functions
├── functions/ → Advanced logic, AI strategies, helpers

configs/ → Shared configurations (tsconfig, eslint, etc.)

````

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
````

### 2. Run all apps and packages in dev mode (turbo)

```bash
pnpm turbo run dev
```

### 3. Build all apps

```bash
pnpm turbo run build
```

### 4. Run linting

```bash
pnpm turbo run lint
```

## 🛠 Tech Stack

- **pnpm workspaces** – for dependency management
- **Turborepo** – for task orchestration
- **React / Preact** – frontend framework (web)
- **XState** – game logic state machine
- **Storybook** – UI component preview and development
- **TypeScript** – static typing

## 📁 Workspaces

Each package/app is a separate workspace and can be developed independently.

## 🧪 Testing

Tests can be added per package using Vitest or Jest.

---
