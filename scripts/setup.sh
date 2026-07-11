#!/bin/bash

echo "Setting up ResumeAI Pro..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js is required"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "pnpm is required. Install: npm i -g pnpm"; exit 1; }

# Install dependencies
pnpm install

# Copy environment file
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env file. Please update with your credentials."
fi

# Generate Prisma client
pnpm --filter @resumeai/database generate

echo "Setup complete! Run 'pnpm dev' to start."
