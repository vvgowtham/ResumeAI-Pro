export const APP_NAME = 'ResumeAI Pro';
export const APP_VERSION = '1.0.0';

export const AI_PROVIDERS = [
  'openai', 'anthropic', 'google', 'openrouter',
  'azure', 'deepseek', 'groq', 'mistral', 'ollama', 'lmstudio',
] as const;

export const EXPORT_FORMATS = [
  'pdf', 'docx', 'html', 'markdown', 'txt', 'png', 'jpg', 'json',
] as const;

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(new Date(date));
}
