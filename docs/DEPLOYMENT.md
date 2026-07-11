# Deployment Guide

## Vercel (Frontend)

1. Connect GitHub repository to Vercel
2. Set root directory to `apps/web`
3. Add environment variables:
   - `API_URL`
4. Deploy

## Railway (Backend)

1. Connect GitHub repository to Railway
2. Set root directory to `apps/api`
3. Add environment variables:
   - `DATABASE_URL`
   - `REDIS_URL`
   - `JWT_SECRET`
4. Deploy

## Docker

```bash
cd docker
docker-compose up -d
```

This starts:
- Web frontend on port 3000
- API backend on port 4000
- PostgreSQL on port 5432
- Redis on port 6379

## Environment Variables

See `.env.example` for complete list.

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret for JWT signing

### Optional
- AI provider keys (configured via AI Studio UI)
- OAuth credentials (Google, GitHub, Microsoft)
- Storage credentials (S3, R2)
