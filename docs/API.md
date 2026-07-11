# API Documentation

Base URL: `http://localhost:4000`

Swagger UI: `http://localhost:4000/api/docs`

## Authentication

### POST /auth/register
Register a new user.

```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe"
}
```

### POST /auth/login
Login and receive JWT token.

```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

## Resumes

### GET /resumes
Get all resumes for authenticated user.

### POST /resumes
Create a new resume.

### POST /resumes/upload
Upload and parse a resume file (PDF, DOCX, TXT).

### PUT /resumes/:id
Update resume content.

### DELETE /resumes/:id
Delete a resume.

## AI Providers

### GET /ai/providers
List configured AI providers.

### POST /ai/providers
Add new AI provider configuration.

### POST /ai/providers/:id/test
Test connection to AI provider.

### POST /ai/optimize
Optimize resume content using configured AI.

## ATS Scoring

### POST /ats/analyze
Analyze resume and generate ATS report.

### GET /ats/reports
Get all ATS reports.

## Export

### POST /export/:format
Export resume in specified format (pdf, docx, png, jpg, html, md, json).
