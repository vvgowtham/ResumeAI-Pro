#!/bin/bash

echo "Deploying ResumeAI Pro..."

# Build all packages
pnpm build

# Run tests
pnpm test

# Deploy frontend to Vercel
pnpm --filter @resumeai/web deploy

echo "Deployment complete!"
