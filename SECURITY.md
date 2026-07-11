# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public issue
2. Email: vvgowthamfb@gmail.com
3. Include description, steps to reproduce, potential impact

We will acknowledge receipt within 48 hours.

## Security Measures

- All API keys encrypted at rest (AES-256)
- JWT tokens with short expiration
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- SQL injection prevention via Prisma ORM
