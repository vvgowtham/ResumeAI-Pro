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
  certifications: string[];
  projects: string[];
  achievements: string[];
  languages: string[];
  interests: string[];
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  photo?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
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
  industries: string[];
  isPremium: boolean;
}
