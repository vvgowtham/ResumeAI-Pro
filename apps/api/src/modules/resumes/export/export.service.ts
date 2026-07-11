import { Injectable } from '@nestjs/common';

@Injectable()
export class ExportService {
  export(resume: any, format: string): string {
    const content = resume.content || {};
    const personal = content.personalInfo || {};

    if (format === 'json') {
      return JSON.stringify(content, null, 2);
    }

    if (format === 'markdown' || format === 'md') {
      return this.toMarkdown(content, personal);
    }

    // Default: HTML
    return this.toHtml(content, personal, resume.title);
  }

  private toHtml(content: any, personal: any, title: string): string {
    const skills = content.skills || {};
    const allSkills = [...(skills.technical||[]),...(skills.tools||[]),...(skills.frameworks||[]),...(skills.databases||[]),...(skills.cloud||[]),...(skills.testing||[]),...(skills.other||[])];

    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#1a1a1a;line-height:1.5}h1{font-size:24px;margin:0}h2{font-size:14px;color:#6200ea;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #eee;padding-bottom:4px;margin-top:20px}h3{font-size:13px;margin:8px 0 2px}p{font-size:12px;margin:4px 0;color:#444}.contact{font-size:11px;color:#666;margin:4px 0}.skills span{display:inline-block;background:#f3e8ff;color:#6200ea;padding:2px 8px;margin:2px;border-radius:3px;font-size:11px}ul{padding-left:16px;margin:4px 0}li{font-size:12px;margin:2px 0;color:#444}</style></head>
<body>
<h1>${personal.fullName || 'Resume'}</h1>
<div class="contact">${[personal.email, personal.phone, personal.linkedin].filter(Boolean).join(' | ')}</div>
${content.summary ? `<h2>Summary</h2><p>${content.summary}</p>` : ''}
${(content.experience||[]).length ? `<h2>Experience</h2>${content.experience.map((e: any) => `<h3>${e.title || ''}${e.company ? ' - ' + e.company : ''}</h3><p style="font-size:11px;color:#888;">${e.startDate || ''}${e.endDate ? ' - ' + e.endDate : e.current ? ' - Present' : ''}</p>${(e.responsibilities||[]).length ? '<ul>' + e.responsibilities.map((r: string) => `<li>${r}</li>`).join('') + '</ul>' : ''}`).join('')}` : ''}
${(content.education||[]).length ? `<h2>Education</h2>${content.education.map((e: any) => `<h3>${e.degree || ''}</h3><p>${e.school || ''}${e.gpa ? ' | GPA: ' + e.gpa : ''}</p>`).join('')}` : ''}
${allSkills.length ? `<h2>Skills</h2><div class="skills">${allSkills.map((s: string) => `<span>${s}</span>`).join('')}</div>` : ''}
${(content.certifications||[]).length ? `<h2>Certifications</h2><ul>${content.certifications.map((c: any) => `<li>${c.title}${c.issuer ? ' - ' + c.issuer : ''}</li>`).join('')}</ul>` : ''}
${(content.languages||[]).length ? `<h2>Languages</h2><p>${content.languages.map((l: any) => `${l.name}${l.level ? ' (' + l.level + ')' : ''}`).join(', ')}</p>` : ''}
</body></html>`;
  }

  private toMarkdown(content: any, personal: any): string {
    const skills = content.skills || {};
    const allSkills = [...(skills.technical||[]),...(skills.tools||[]),...(skills.frameworks||[]),...(skills.databases||[]),...(skills.cloud||[]),...(skills.testing||[]),...(skills.other||[])];
    let md = `# ${personal.fullName || 'Resume'}\n`;
    md += [personal.email, personal.phone, personal.linkedin].filter(Boolean).join(' | ') + '\n\n';
    if (content.summary) md += `## Summary\n${content.summary}\n\n`;
    if ((content.experience||[]).length) {
      md += '## Experience\n';
      for (const e of content.experience) {
        md += `### ${e.title || ''}${e.company ? ' - ' + e.company : ''}\n`;
        md += `*${e.startDate || ''}${e.endDate ? ' - ' + e.endDate : e.current ? ' - Present' : ''}*\n`;
        for (const r of (e.responsibilities || [])) md += `- ${r}\n`;
        md += '\n';
      }
    }
    if ((content.education||[]).length) {
      md += '## Education\n';
      for (const e of content.education) md += `- **${e.degree || ''}** - ${e.school || ''}\n`;
      md += '\n';
    }
    if (allSkills.length) md += `## Skills\n${allSkills.join(', ')}\n\n`;
    if ((content.certifications||[]).length) {
      md += '## Certifications\n';
      for (const c of content.certifications) md += `- ${c.title}${c.issuer ? ' (' + c.issuer + ')' : ''}\n`;
    }
    return md;
  }
}
