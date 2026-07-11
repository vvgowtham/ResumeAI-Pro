import { Injectable, BadRequestException } from '@nestjs/common';

export interface CanonicalResume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    linkedin: string;
    github: string;
    portfolio: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string[];
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    major: string;
    gpa: string;
    startDate: string;
    endDate: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    frameworks: string[];
    languages: string[];
    databases: string[];
    cloud: string[];
    testing: string[];
    other: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    role: string;
    technologies: string[];
    duration: string;
    achievements: string[];
  }>;
  certifications: Array<{
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate: string;
    credentialId: string;
  }>;
  awards: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
}

@Injectable()
export class ResumeParserService {
  async parse(buffer: Buffer, mimeType: string, fileName: string): Promise<CanonicalResume> {
    let text = '';

    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      text = await this.parsePdf(buffer);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      text = await this.parseDocx(buffer);
    } else if (mimeType === 'text/plain' || fileName.endsWith('.txt')) {
      text = buffer.toString('utf-8');
    } else if (mimeType === 'text/html' || fileName.endsWith('.html')) {
      text = this.stripHtml(buffer.toString('utf-8'));
    } else {
      text = buffer.toString('utf-8');
    }

    if (!text || text.trim().length < 20) {
      throw new BadRequestException('Could not extract text from file. The file may be empty or corrupted.');
    }

    return this.extractStructuredData(text);
  }

  private async parsePdf(buffer: Buffer): Promise<string> {
    try {
      const pdfParse = require('pdf-parse');
      const result = await pdfParse(buffer);
      return result.text || '';
    } catch (e) {
      throw new BadRequestException('Failed to parse PDF. The file may be corrupted or password-protected.');
    }
  }

  private async parseDocx(buffer: Buffer): Promise<string> {
    try {
      // Simple DOCX extraction using raw XML parsing
      const JSZip = require('jszip') || null;
      if (!JSZip) {
        // Fallback: try to read as text
        return buffer.toString('utf-8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      }
      const zip = await JSZip.loadAsync(buffer);
      const content = await zip.file('word/document.xml')?.async('string');
      if (!content) return '';
      return content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    } catch {
      // Fallback for DOCX parsing
      return buffer.toString('utf-8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  private extractStructuredData(text: string): CanonicalResume {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    return {
      personalInfo: this.extractPersonalInfo(text),
      summary: this.extractSection(text, ['summary', 'objective', 'profile', 'about']),
      experience: this.extractExperience(text),
      education: this.extractEducation(text),
      skills: this.extractSkills(text),
      projects: this.extractProjects(text),
      certifications: this.extractCertifications(text),
      awards: this.extractAwards(text),
      languages: this.extractLanguages(text),
    };
  }

  private extractPersonalInfo(text: string) {
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/);
    const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
    const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/);

    // First significant line is likely the name
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let fullName = '';
    for (const line of lines.slice(0, 5)) {
      if (line.length > 2 && line.length < 50 && !line.includes('@') && !line.match(/^\+?\d/)) {
        fullName = line;
        break;
      }
    }

    return {
      fullName,
      email: emailMatch?.[0] || '',
      phone: phoneMatch?.[0] || '',
      address: '',
      city: '',
      state: '',
      country: '',
      linkedin: linkedinMatch?.[0] ? `https://${linkedinMatch[0]}` : '',
      github: githubMatch?.[0] ? `https://${githubMatch[0]}` : '',
      portfolio: '',
      website: '',
    };
  }

  private extractSection(text: string, headers: string[]): string {
    const lines = text.split('\n');
    let capturing = false;
    let content: string[] = [];

    for (const line of lines) {
      const lower = line.toLowerCase().trim();
      if (headers.some(h => lower.startsWith(h) || lower === h)) {
        capturing = true;
        continue;
      }
      if (capturing) {
        if (this.isSectionHeader(lower)) break;
        if (line.trim()) content.push(line.trim());
      }
    }

    return content.join(' ').slice(0, 1000);
  }

  private isSectionHeader(line: string): boolean {
    const headers = ['experience', 'education', 'skills', 'projects', 'certif', 'award', 'language', 'summary', 'objective', 'work history', 'employment', 'professional'];
    return headers.some(h => line.startsWith(h) && line.length < 40);
  }

  private extractExperience(text: string): CanonicalResume['experience'] {
    const section = this.extractSection(text, ['experience', 'work history', 'employment', 'professional experience']);
    if (!section) return [];

    // Simple heuristic: split by date patterns
    const datePattern = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*\d{4}\s*[-–]\s*(present|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*\d{0,4}/gi;
    const matches = section.match(datePattern) || [];

    if (matches.length === 0) {
      return [{
        id: this.genId(),
        company: '',
        title: section.slice(0, 80),
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: [section],
        achievements: [],
      }];
    }

    return matches.slice(0, 5).map((dateStr, i) => ({
      id: this.genId(),
      company: '',
      title: '',
      location: '',
      startDate: dateStr.split(/[-–]/)[0]?.trim() || '',
      endDate: dateStr.split(/[-–]/)[1]?.trim() || '',
      current: dateStr.toLowerCase().includes('present'),
      responsibilities: [],
      achievements: [],
    }));
  }

  private extractEducation(text: string): CanonicalResume['education'] {
    const section = this.extractSection(text, ['education', 'academic', 'qualification']);
    if (!section) return [];

    return [{
      id: this.genId(),
      degree: section.slice(0, 100),
      school: '',
      major: '',
      gpa: '',
      startDate: '',
      endDate: '',
    }];
  }

  private extractSkills(text: string): CanonicalResume['skills'] {
    const section = this.extractSection(text, ['skills', 'technical skills', 'core competencies', 'expertise']);
    const allSkills = section.split(/[,;|•\n]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 40);

    // Categorize skills
    const techKeywords = ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin'];
    const toolKeywords = ['git', 'docker', 'kubernetes', 'jenkins', 'jira', 'postman', 'vs code', 'intellij'];
    const frameworkKeywords = ['react', 'angular', 'vue', 'next', 'nest', 'spring', 'django', 'flask', 'express'];
    const dbKeywords = ['mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'sqlite'];
    const cloudKeywords = ['aws', 'azure', 'gcp', 'google cloud', 'heroku', 'vercel', 'netlify'];
    const testKeywords = ['selenium', 'cypress', 'jest', 'mocha', 'testng', 'playwright', 'junit', 'pytest'];

    const categorize = (skill: string) => {
      const lower = skill.toLowerCase();
      if (techKeywords.some(k => lower.includes(k))) return 'technical';
      if (toolKeywords.some(k => lower.includes(k))) return 'tools';
      if (frameworkKeywords.some(k => lower.includes(k))) return 'frameworks';
      if (dbKeywords.some(k => lower.includes(k))) return 'databases';
      if (cloudKeywords.some(k => lower.includes(k))) return 'cloud';
      if (testKeywords.some(k => lower.includes(k))) return 'testing';
      return 'other';
    };

    const result: CanonicalResume['skills'] = {
      technical: [], soft: [], tools: [], frameworks: [],
      languages: [], databases: [], cloud: [], testing: [], other: [],
    };

    for (const skill of allSkills) {
      const cat = categorize(skill);
      result[cat].push(skill);
    }

    return result;
  }

  private extractProjects(text: string): CanonicalResume['projects'] {
    const section = this.extractSection(text, ['projects', 'personal projects', 'key projects']);
    if (!section) return [];
    return [{ id: this.genId(), name: section.slice(0, 60), description: section, role: '', technologies: [], duration: '', achievements: [] }];
  }

  private extractCertifications(text: string): CanonicalResume['certifications'] {
    const section = this.extractSection(text, ['certif', 'certification', 'licenses']);
    if (!section) return [];
    const items = section.split(/[•\n]/).filter(Boolean).slice(0, 5);
    return items.map(item => ({
      id: this.genId(), title: item.trim().slice(0, 100), issuer: '', issueDate: '', expiryDate: '', credentialId: '',
    }));
  }

  private extractAwards(text: string): CanonicalResume['awards'] {
    const section = this.extractSection(text, ['awards', 'honors', 'achievements']);
    if (!section) return [];
    return [{ id: this.genId(), title: section.slice(0, 100), issuer: '', date: '', description: section }];
  }

  private extractLanguages(text: string): CanonicalResume['languages'] {
    const section = this.extractSection(text, ['languages', 'spoken languages']);
    if (!section) return [{ name: 'English', level: 'Fluent' }];
    const items = section.split(/[,;•\n]/).filter(Boolean).slice(0, 6);
    return items.map(item => ({ name: item.trim(), level: '' }));
  }

  private genId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
