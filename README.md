# MemoryMesh

Persistent shared memory for AI coding agents.

MemoryMesh gives Claude Code, Codex, Cursor, Gemini CLI, and MCP-compatible agents one shared local memory layer.

## MVP

- Local-first storage
- Persistent JSON file store
- CLI commands for init, remember, recall, and doctor
- SDK package for programmatic remember/recall
- Project-scoped memories
- Keyword search first, vector search later

## Install

```bash
pnpm install
pnpm build
```

## Usage

Run against the default store at `~/.memorymesh/memories.json`:

```bash
pnpm --dir apps/cli dev init
pnpm --dir apps/cli dev remember "This repo uses pnpm workspace"
pnpm --dir apps/cli dev recall "pnpm"
pnpm --dir apps/cli dev doctor
```

Use an explicit store path for testing or isolated projects:

```bash
pnpm --dir apps/cli dev --store /tmp/memorymesh.json --project "$PWD" init
pnpm --dir apps/cli dev --store /tmp/memorymesh.json --project "$PWD" remember "Deployment uses Vercel"
pnpm --dir apps/cli dev --store /tmp/memorymesh.json --project "$PWD" recall "deployment"
```

After building, the compiled CLI can run directly:

```bash
node apps/cli/dist/index.js --store /tmp/memorymesh.json --project "$PWD" recall "deployment"
```

## Verification

```bash
pnpm test
pnpm build
```

## Structure

```txt
apps/cli
apps/api
apps/dashboard
apps/mcp-server
packages/core
packages/storage
packages/search
packages/sdk
packages/shared
integrations/
docs/
examples/
```

## Deferred

- REST API
- MCP server
- Dashboard
- SQLite, Postgres, vector search, and hosted sync
