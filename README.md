# ResumeAI Pro

[![CI/CD Pipeline](https://github.com/vvgowtham/ResumeAI-Pro/actions/workflows/ci.yml/badge.svg)](https://github.com/vvgowtham/ResumeAI-Pro/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/vvgowtham/ResumeAI-Pro/releases/tag/v1.0.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red.svg)](https://nestjs.com/)

> **AI-powered Resume Builder & ATS Optimizer**
> Build, optimize, and export professional resumes with 50+ templates and intelligent ATS scoring.

---

## Features

- **50+ Professional Templates** (25 ATS-Friendly + 25 Attractive)
- **AI Resume Optimization** (OpenAI, Claude, Gemini, OpenRouter, Ollama, LM Studio)
- **Real-time ATS Scoring** with detailed analysis and downloadable reports
- **Live Resume Editor** with drag-and-drop sections and real-time preview
- **Job Description Matching** with keyword analysis and recommendations
- **Cover Letter Generator** with multiple tones and languages
- **LinkedIn Profile Optimizer** (headline, about, experience, skills)
- **Multi-format Export** (PDF, DOCX, PNG, JPG, HTML, Markdown, JSON, SVG)
- **Resume Version Control** with history, restore, compare, and duplicate
- **AI Studio** for configuring multiple AI providers with encrypted key storage
- **Analytics Dashboard** with ATS improvement tracking
- **Team Ready** architecture for future collaboration features

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |
| State | Zustand, TanStack Query |
| Backend | NestJS, Prisma, PostgreSQL, Redis, BullMQ |
| Auth | JWT, Google OAuth, GitHub OAuth, Microsoft OAuth |
| AI | OpenAI SDK (compatible with all providers) |
| Export | Puppeteer (PDF/PNG/JPG), docx.js (DOCX), custom (HTML/MD/JSON) |
| DevOps | Docker, GitHub Actions, Vercel, Railway |

## Project Structure

```
ResumeAI-Pro/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── api/                 # NestJS backend API
├── packages/
│   ├── ui/                  # Shared UI component library
│   ├── types/               # Shared TypeScript interfaces
│   ├── shared/              # Shared utilities and constants
│   └── database/            # Prisma schema, migrations, and seed
├── docker/                  # Docker Compose and Dockerfiles
├── docs/                    # Architecture, API, and deployment docs
├── scripts/                 # Setup and deployment scripts
└── .github/workflows/       # CI/CD pipelines
```

## Quick Start

### Prerequisites
- Node.js >= 20
- pnpm >= 9
- PostgreSQL 16
- Redis 7

### Installation

```bash
git clone https://github.com/vvgowtham/ResumeAI-Pro.git
cd ResumeAI-Pro
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
```

Frontend: http://localhost:3000
Backend: http://localhost:4000
API Docs: http://localhost:4000/api/docs

## Docker

```bash
cd docker
docker-compose up -d
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all services in development |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all packages |
| `pnpm test` | Run all tests |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:seed` | Seed 50 templates |
| `pnpm db:studio` | Open Prisma Studio |

## AI Providers

Configure via the AI Studio page in the app. Supported:

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4.1, GPT-5 |
| Anthropic | Claude Sonnet 4, Claude Opus 4 |
| Google | Gemini 2.5 Pro, Gemini Flash |
| OpenRouter | Any model |
| DeepSeek | V3, R1 |
| Groq | Llama 3.3 |
| Azure OpenAI | GPT-4.1 |
| Mistral | Large |
| Ollama | Local models |
| LM Studio | Local models |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT - see [LICENSE](LICENSE)

## Author

**Gowtham V V** - [@vvgowtham](https://github.com/vvgowtham)
