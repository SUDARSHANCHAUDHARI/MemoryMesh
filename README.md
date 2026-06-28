# MemoryMesh

Persistent shared memory for AI coding agents.

MemoryMesh gives Claude Code, Codex, Cursor, Gemini CLI, and MCP-compatible agents one shared local memory layer.

## MVP

- Local-first storage
- SQLite-ready storage package
- CLI commands
- REST API app
- MCP server app
- SDK package
- Project-scoped memories
- Keyword search first, vector search later

## Commands planned

```bash
memorymesh init
memorymesh remember "This repo uses pnpm workspace"
memorymesh recall "deployment issue"
memorymesh summarize
memorymesh doctor
memorymesh mcp
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
