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

    try {
      if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
        text = await this.parsePdf(buffer);
      } else if (
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')
      ) {
        text = this.parseDocx(buffer);
      } else if (mimeType === 'text/plain' || fileName.endsWith('.txt')) {
        text = buffer.toString('utf-8');
      } else if (mimeType === 'text/html' || fileName.endsWith('.html')) {
        text = buffer.toString('utf-8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      } else {
        text = buffer.toString('utf-8');
      }
    } catch (e) {
      // If parsing fails, try plain text extraction
      text = buffer.toString('utf-8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    }

    if (!text || text.trim().length < 10) {
      throw new BadRequestException('Could not extract text from the uploaded file.');
    }

    return this.extractStructuredData(text);
  }

  private async parsePdf(buffer: Buffer): Promise<string> {
    try {
      const pdfParse = require('pdf-parse');
      const result = await pdfParse(buffer, { max: 0 });
      return result.text || '';
    } catch (e) {
      // pdf-parse not available or PDF is corrupted - try buffer as text
      const raw = buffer.toString('utf-8');
      // Try to extract readable text from raw PDF
      const textParts = raw.match(/\(([^)]+)\)/g);
      if (textParts && textParts.length > 5) {
        return textParts.map(p => p.slice(1, -1)).join(' ');
      }
      throw new BadRequestException('Failed to parse PDF. Install pdf-parse or ensure the file is valid.');
    }
  }

  private parseDocx(buffer: Buffer): string {
    // Extract text from DOCX XML without external dependencies
    try {
      const content = buffer.toString('binary');
      // DOCX files are ZIPs - look for word/document.xml content
      const xmlMatch = content.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
      if (xmlMatch && xmlMatch.length > 0) {
        return xmlMatch.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
      }
      // Fallback: extract any readable ASCII text
      return content.replace(/[^\x20-\x7E\n]/g, ' ').replace(/\s+/g, ' ').trim();
    } catch {
      return buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ').replace(/\s+/g, ' ');
    }
  }

  private extractStructuredData(text: string): CanonicalResume {
    return {
      personalInfo: this.extractPersonalInfo(text),
      summary: this.extractSection(text, ['summary', 'objective', 'profile', 'about me', 'professional summary']),
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
    const phoneMatch = text.match(/(\+?\d[\d\s.()-]{7,15}\d)/);
    const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
    const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/);

    const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l.length > 1);
    let fullName = '';
    for (const line of lines.slice(0, 8)) {
      const clean = line.replace(/[^a-zA-Z\s.]/g, '').trim();
      if (clean.length >= 3 && clean.length < 40 && !clean.includes('@') && /^[A-Z]/.test(clean)) {
        fullName = clean;
        break;
      }
    }

    return {
      fullName,
      email: emailMatch?.[0] || '',
      phone: phoneMatch?.[1] || phoneMatch?.[0] || '',
      address: '',
      city: '',
      state: '',
      country: '',
      linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : '',
      github: githubMatch ? `https://${githubMatch[0]}` : '',
      portfolio: '',
      website: '',
    };
  }

  private extractSection(text: string, headers: string[]): string {
    const lines = text.split(/[\n\r]+/);
    let capturing = false;
    const content: string[] = [];

    for (const line of lines) {
      const lower = line.toLowerCase().trim();
      if (headers.some(h => lower === h || lower.startsWith(h + ':') || lower.startsWith(h + ' '))) {
        capturing = true;
        const afterHeader = line.replace(new RegExp(`^.*?(${headers.join('|')})\\s*:?\\s*`, 'i'), '').trim();
        if (afterHeader) content.push(afterHeader);
        continue;
      }
      if (capturing) {
        if (this.isSectionHeader(lower)) break;
        if (line.trim()) content.push(line.trim());
      }
    }
    return content.join(' ').slice(0, 800);
  }

  private isSectionHeader(line: string): boolean {
    const headers = ['experience', 'education', 'skills', 'projects', 'certif', 'award', 'language', 'summary', 'objective', 'work history', 'employment', 'professional', 'references', 'interests', 'hobbies'];
    return headers.some(h => (line === h || line.startsWith(h + ':') || line.startsWith(h + ' ')) && line.length < 35);
  }

  private extractExperience(text: string): CanonicalResume['experience'] {
    const section = this.extractSection(text, ['experience', 'work history', 'employment', 'professional experience', 'work experience']);
    if (!section) return [];

    const lines = section.split(/[.!]/).filter(l => l.trim().length > 10);
    return [{
      id: this.genId(),
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: lines.slice(0, 5).map(l => l.trim()),
      achievements: [],
    }];
  }

  private extractEducation(text: string): CanonicalResume['education'] {
    const section = this.extractSection(text, ['education', 'academic', 'qualification', 'academics']);
    if (!section) return [];
    return [{ id: this.genId(), degree: section.slice(0, 100), school: '', major: '', gpa: '', startDate: '', endDate: '' }];
  }

  private extractSkills(text: string): CanonicalResume['skills'] {
    const section = this.extractSection(text, ['skills', 'technical skills', 'core competencies', 'expertise', 'technologies']);
    const allSkills = section.split(/[,;|\n]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 35);

    const result: CanonicalResume['skills'] = { technical: [], soft: [], tools: [], frameworks: [], languages: [], databases: [], cloud: [], testing: [], other: [] };

    const techKw = ['java','python','javascript','typescript','c++','c#','go','rust','ruby','php','swift','kotlin','scala','r','matlab'];
    const toolKw = ['git','docker','kubernetes','jenkins','jira','postman','vs code','intellij','webpack','vite'];
    const fwKw = ['react','angular','vue','next','nest','spring','django','flask','express','laravel','rails','.net'];
    const dbKw = ['mysql','postgresql','postgres','mongodb','redis','elasticsearch','dynamodb','sqlite','oracle','sql server'];
    const cloudKw = ['aws','azure','gcp','google cloud','heroku','vercel','netlify','cloudflare','digitalocean'];
    const testKw = ['selenium','cypress','jest','mocha','testng','playwright','junit','pytest','cucumber','appium'];

    for (const skill of allSkills) {
      const lower = skill.toLowerCase();
      if (techKw.some(k => lower.includes(k))) result.technical.push(skill);
      else if (toolKw.some(k => lower.includes(k))) result.tools.push(skill);
      else if (fwKw.some(k => lower.includes(k))) result.frameworks.push(skill);
      else if (dbKw.some(k => lower.includes(k))) result.databases.push(skill);
      else if (cloudKw.some(k => lower.includes(k))) result.cloud.push(skill);
      else if (testKw.some(k => lower.includes(k))) result.testing.push(skill);
      else result.other.push(skill);
    }
    return result;
  }

  private extractProjects(text: string): CanonicalResume['projects'] {
    const section = this.extractSection(text, ['projects', 'personal projects', 'key projects']);
    if (!section) return [];
    return [{ id: this.genId(), name: section.slice(0, 60), description: section, role: '', technologies: [], duration: '', achievements: [] }];
  }

  private extractCertifications(text: string): CanonicalResume['certifications'] {
    const section = this.extractSection(text, ['certif', 'certification', 'licenses', 'credentials']);
    if (!section) return [];
    return section.split(/[,;\n]/).filter(s => s.trim().length > 3).slice(0, 5).map(item => ({
      id: this.genId(), title: item.trim().slice(0, 100), issuer: '', issueDate: '', expiryDate: '', credentialId: '',
    }));
  }

  private extractAwards(text: string): CanonicalResume['awards'] {
    const section = this.extractSection(text, ['awards', 'honors', 'recognition']);
    if (!section) return [];
    return [{ id: this.genId(), title: section.slice(0, 100), issuer: '', date: '', description: '' }];
  }

  private extractLanguages(text: string): CanonicalResume['languages'] {
    const section = this.extractSection(text, ['languages', 'spoken languages']);
    if (!section) return [{ name: 'English', level: 'Fluent' }];
    return section.split(/[,;\n]/).filter(Boolean).slice(0, 6).map(item => ({ name: item.trim(), level: '' }));
  }

  private genId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
