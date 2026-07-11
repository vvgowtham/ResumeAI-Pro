# Contributing to ResumeAI Pro

Thank you for your interest in contributing!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ResumeAI-Pro.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Install dependencies: `pnpm install`
5. Make your changes
6. Run tests: `pnpm test`
7. Commit using conventional commits: `git commit -m "feat: add new feature"`
8. Push and create a Pull Request

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Build process, dependencies
- `perf:` Performance improvement

## Code Standards

- TypeScript strict mode
- ESLint + Prettier formatting
- Unit tests for business logic
- E2E tests for critical flows

## Branch Strategy

- `main` - production releases
- `development` - active development
- `feature/*` - new features
- `fix/*` - bug fixes
