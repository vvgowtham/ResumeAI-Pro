export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
  credits: number;
}

export interface Resume {
  id: string;
  title: string;
  content: ResumeContent;
  templateId?: string;
  atsScore: number;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  pages: number;
  isFavorite: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
  achievements: string[];
  languages: Language[];
  interests: string[];
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  photo?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface Language {
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface AtsReport {
  id: string;
  overallScore: number;
  formatting: number;
  keywords: number;
  grammar: number;
  readability: number;
  sections: number;
  skills: number;
  experience: number;
  education: number;
  achievements: number;
  actionVerbs: number;
  suggestions: string[];
}

export interface AiProvider {
  id: string;
  name: string;
  provider: string;
  model: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  category: 'ATS_FRIENDLY' | 'ATTRACTIVE';
  atsScore: number;
  thumbnail?: string;
  industries: string[];
  isPremium: boolean;
}
