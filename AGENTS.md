# MemoryMesh Agent Notes

MemoryMesh is a local-first shared memory layer for AI coding agents.

## Working Rules

- Keep the first product surface CLI-first and local-first.
- Prefer small, testable TypeScript packages under `packages/`.
- Do not commit `.env`, generated archives, local caches, build output, or personal agent config.
- Do not add CI/CD unless explicitly requested.

## Product Scope

- MVP priority: initialize local storage, remember project-scoped notes, recall with keyword search, and expose the flow through CLI/SDK.
- Defer dashboards, hosted sync, vector search, and external database integrations until the local memory loop is solid.
