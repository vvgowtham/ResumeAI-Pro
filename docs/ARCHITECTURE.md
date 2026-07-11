# Architecture

## System Overview

```
┌──────────────────────────────────────────────────┐
│                    Client (Browser)                    │
│              Next.js 15 + React 19                     │
└───────────────────────┬──────────────────────────┘
                        │
                   REST / WebSocket
                        │
┌───────────────────────┼──────────────────────────┐
│                   API Gateway                          │
│                  NestJS + JWT                           │
└────────┬───────────────┬───────────────┬─────────┘
         │               │               │
    ┌────┴────┐   ┌────┴────┐   ┌────┴────┐
    │PostgreSQL│   │  Redis   │   │  BullMQ  │
    │ (Prisma) │   │ (Cache)  │   │ (Queue)  │
    └──────────┘   └──────────┘   └──────────┘

              External Services
    ┌───────────────────────────────────┐
    │ OpenAI | Claude | Gemini | Groq  │
    │ OpenRouter | DeepSeek | Ollama   │
    └───────────────────────────────────┘
```

## Module Structure

### Frontend (apps/web)
- App Router with route groups
- Server Components by default
- Client Components for interactivity
- Zustand for global state
- TanStack Query for server state
- DND Kit for drag-and-drop

### Backend (apps/api)
- NestJS modular architecture
- Prisma ORM for database
- JWT authentication with Passport
- Swagger/OpenAPI documentation
- Rate limiting with Throttler
- BullMQ for background jobs

### Packages (shared)
- `@resumeai/database` - Prisma schema and client
- `@resumeai/types` - Shared TypeScript interfaces
- `@resumeai/shared` - Utilities and constants
- `@resumeai/ui` - Shared UI components
- `@resumeai/config` - Shared ESLint/TS configs

## Data Flow

1. User uploads resume -> API parses PDF/DOCX
2. Parsed content stored as structured JSON
3. AI provider analyzes and scores content
4. Template applied to structured data
5. User edits in live builder
6. Export engine renders to PDF/DOCX/PNG
