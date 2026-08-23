# MemoryMesh

Persistent shared memory for AI coding agents.

MemoryMesh gives Claude Code, Codex, Cursor, Gemini CLI, and MCP-compatible agents one shared local memory layer.

## Table of Contents

- [MVP](#mvp)
- [Install](#install)
- [Usage](#usage)
- [Verification](#verification)
- [Structure](#structure)
- [Deferred](#deferred)
- [About](#about)

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

---

## About

I'm Sudarshan Chaudhari, a Senior Quality Engineer, Test Automation specialist, and AI systems builder based in Bangkok, Thailand.

I have 13+ years of experience in software quality engineering, working across SaaS, fintech, gaming, web, mobile, cloud, and digital signage platforms. My background combines hands-on test automation with QA leadership, test strategy, CI/CD, release quality, production investigation, and cross-platform validation.

Alongside my professional QA career, I run [SudarshanTechLabs](https://sudarshantechlabs.com/), my independent engineering and product lab where I design, build, test, and ship software across Android, web, AI, cybersecurity, developer tooling, and cross-platform applications.

### What I work on

- ⚙️ **Quality Engineering & Test Automation** — Playwright, Selenium, Cypress, Appium, API testing, automation frameworks, end-to-end testing, CI/CD, release gates, GitHub Actions, risk-based testing, and production validation
- 🤖 **AI Systems & Automation** — AI agents, multi-agent orchestration, MCP servers, AI-assisted QA, prompt tooling, developer workflows, automation systems, and Claude Code plugins
- 📱 **Mobile & Cross-Platform Applications** — Android applications built with Kotlin and Jetpack Compose, Google Play releases, automated build and publishing pipelines, and cross-platform development spanning iOS, web, Windows, and macOS
- 🌐 **Web Applications & Platforms** — Full-stack applications using Next.js, TypeScript, Firebase, Cloudflare, REST APIs, and modern web infrastructure
- 🛠️ **Developer Tooling & CLI Engineering** — Rust, Python, TypeScript, CLI utilities, multi-repository tooling, build automation, release tooling, and engineering productivity systems
- 🛡️ **Cybersecurity & Observability** — Threat detection, log analysis, security auditing, vulnerability assessment, monitoring, and security-focused developer tools
- 📺 **Digital Signage & Device Platforms** — Content validation, playback testing, device compatibility, production investigation, monitoring, and QA across diverse hardware and operating-system environments

My work sits at the intersection of quality engineering, automation, AI, and software development. I approach products with a QA mindset from the beginning: understanding failure modes, designing for testability, automating repetitive work, and building release confidence into the engineering process.

Through SudarshanTechLabs, I also build products and tools from idea to production, covering architecture, development, testing, CI/CD, release automation, monitoring, and ongoing maintenance.

🌐 [sudarshantechlabs.com](https://sudarshantechlabs.com/) · 💼 [LinkedIn](https://linkedin.com/in/sudarshan-chaudhari) · 🐙 [GitHub](https://github.com/SUDARSHANCHAUDHARI) · ✉️ [sunny.sudarshan@gmail.com](mailto:sunny.sudarshan@gmail.com)
