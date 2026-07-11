export const APP_NAME = 'ResumeAI Pro';
export const APP_VERSION = '1.0.0';

export const AI_PROVIDERS = [
  'openai',
  'anthropic',
  'google',
  'openrouter',
  'azure',
  'deepseek',
  'groq',
  'mistral',
  'ollama',
  'lmstudio',
] as const;

export const EXPORT_FORMATS = ['pdf', 'docx', 'html', 'markdown', 'txt', 'png', 'jpg', 'svg', 'json'] as const;

export const ATS_CATEGORIES = [
  'formatting',
  'keywords',
  'grammar',
  'readability',
  'sections',
  'skills',
  'experience',
  'education',
  'achievements',
  'actionVerbs',
] as const;

export const RESUME_SECTIONS = [
  'personalInfo',
  'summary',
  'experience',
  'education',
  'skills',
  'certifications',
  'projects',
  'achievements',
  'languages',
  'interests',
] as const;
