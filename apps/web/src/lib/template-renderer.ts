/**
 * ResumeAI Pro Template Rendering Engine
 * 
 * Single source of truth for rendering canonical resume JSON into HTML.
 * Every template, preview, builder, and export uses this renderer.
 */

export interface TemplateConfig {
  id: string;
  name: string;
  category: 'ats' | 'attractive';
  atsScore: number;
  layout: 'single' | 'sidebar-left' | 'sidebar-right';
  fonts: { heading: string; body: string };
  colors: { primary: string; secondary: string; text: string; muted: string; bg: string; accent: string; sidebarBg?: string; sidebarText?: string };
  spacing: 'compact' | 'normal' | 'spacious';
  headerStyle: 'centered' | 'left' | 'banner' | 'minimal' | 'split';
  sectionOrder: string[];
  showPhoto: boolean;
  showIcons: boolean;
  borderStyle: 'none' | 'line' | 'dots';
  bulletStyle: 'disc' | 'dash' | 'arrow' | 'square' | 'none';
}

export interface CanonicalResume {
  personalInfo: { fullName: string; email: string; phone: string; address: string; city: string; state: string; country: string; linkedin: string; github: string; portfolio: string; website: string };
  summary: string;
  experience: Array<{ id: string; company: string; title: string; location: string; startDate: string; endDate: string; current: boolean; responsibilities: string[]; achievements: string[] }>;
  education: Array<{ id: string; degree: string; school: string; major: string; gpa: string; startDate: string; endDate: string }>;
  skills: { technical: string[]; soft: string[]; tools: string[]; frameworks: string[]; languages: string[]; databases: string[]; cloud: string[]; testing: string[]; other: string[] };
  projects: Array<{ id: string; name: string; description: string; role: string; technologies: string[]; duration: string; achievements: string[] }>;
  certifications: Array<{ id: string; title: string; issuer: string; issueDate: string; expiryDate: string; credentialId: string }>;
  awards: Array<{ id: string; title: string; issuer: string; date: string; description: string }>;
  languages: Array<{ name: string; level: string }>;
}

const spacingMap = { compact: { section: '12px', item: '6px', line: '1.3' }, normal: { section: '18px', item: '10px', line: '1.5' }, spacious: { section: '24px', item: '14px', line: '1.6' } };
const bulletMap = { disc: '\u2022', dash: '\u2013', arrow: '\u203A', square: '\u25AA', none: '' };

export function renderResume(data: CanonicalResume | null, config: TemplateConfig, scale = 1): string {
  if (!data) return '<div style="padding:40px;text-align:center;color:#999;font-size:12px;">Upload a resume to see preview</div>';
  
  const sp = spacingMap[config.spacing];
  const bullet = bulletMap[config.bulletStyle];
  const c = config.colors;
  const allSkills = [...(data.skills?.technical||[]),...(data.skills?.tools||[]),...(data.skills?.frameworks||[]),...(data.skills?.databases||[]),...(data.skills?.cloud||[]),...(data.skills?.testing||[]),...(data.skills?.other||[])];

  const renderHeader = () => {
    const name = data.personalInfo?.fullName || 'Your Name';
    const contacts = [data.personalInfo?.email, data.personalInfo?.phone, data.personalInfo?.linkedin].filter(Boolean);
    if (config.headerStyle === 'centered') return `<div style="text-align:center;margin-bottom:${sp.section};"><h1 style="font-family:${config.fonts.heading};font-size:22px;color:${c.text};margin:0;letter-spacing:0.5px;">${name}</h1>${data.personalInfo?.email ? `<div style="font-size:9px;color:${c.muted};margin-top:4px;">${contacts.join(' | ')}</div>` : ''}</div>`;
    if (config.headerStyle === 'banner') return `<div style="background:${c.primary};color:white;padding:16px 20px;margin:-20px -20px ${sp.section} -20px;"><h1 style="font-family:${config.fonts.heading};font-size:20px;margin:0;">${name}</h1><div style="font-size:9px;opacity:0.85;margin-top:3px;">${contacts.join(' \u2022 ')}</div></div>`;
    if (config.headerStyle === 'minimal') return `<div style="margin-bottom:${sp.section};border-bottom:1px solid ${c.accent};padding-bottom:8px;"><h1 style="font-family:${config.fonts.heading};font-size:18px;color:${c.text};margin:0;">${name}</h1><div style="font-size:8px;color:${c.muted};margin-top:2px;">${contacts.join(' | ')}</div></div>`;
    if (config.headerStyle === 'split') return `<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:${sp.section};border-bottom:2px solid ${c.primary};padding-bottom:8px;"><h1 style="font-family:${config.fonts.heading};font-size:20px;color:${c.text};margin:0;">${name}</h1><div style="font-size:8px;color:${c.muted};text-align:right;">${contacts.join('<br>')}</div></div>`;
    return `<div style="margin-bottom:${sp.section};"><h1 style="font-family:${config.fonts.heading};font-size:22px;color:${c.text};margin:0;">${name}</h1><div style="font-size:9px;color:${c.muted};margin-top:3px;">${contacts.join(' \u2022 ')}</div></div>`;
  };

  const renderSectionTitle = (title: string) => `<h2 style="font-family:${config.fonts.heading};font-size:11px;font-weight:700;color:${c.primary};text-transform:uppercase;letter-spacing:0.8px;margin:0 0 6px 0;padding-bottom:3px;border-bottom:${config.borderStyle === 'line' ? `1px solid ${c.accent}` : config.borderStyle === 'dots' ? `1px dotted ${c.accent}` : 'none'};">${title}</h2>`;

  const renderSummary = () => data.summary ? `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Summary')}<p style="font-size:9px;color:${c.text};line-height:${sp.line};margin:0;">${data.summary}</p></div>` : '';

  const renderExperience = () => {
    if (!data.experience?.length) return '';
    const items = data.experience.map(exp => {
      const bullets = (exp.responsibilities || []).map(r => `<li style="margin-bottom:2px;">${bullet} ${r}</li>`).join('');
      return `<div style="margin-bottom:${sp.item};"><div style="display:flex;justify-content:space-between;"><strong style="font-size:10px;color:${c.text};">${exp.title || 'Position'}${exp.company ? ` - ${exp.company}` : ''}</strong><span style="font-size:8px;color:${c.muted};">${exp.startDate || ''}${exp.endDate ? ` - ${exp.endDate}` : exp.current ? ' - Present' : ''}</span></div>${bullets ? `<ul style="margin:3px 0 0 0;padding-left:${config.bulletStyle === 'none' ? '0' : '12px'};list-style:none;font-size:8.5px;color:${c.muted};line-height:1.4;">${bullets}</ul>` : ''}</div>`;
    }).join('');
    return `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Experience')}${items}</div>`;
  };

  const renderEducation = () => {
    if (!data.education?.length) return '';
    const items = data.education.map(edu => `<div style="margin-bottom:${sp.item};"><div style="display:flex;justify-content:space-between;"><strong style="font-size:10px;color:${c.text};">${edu.degree || 'Degree'}</strong><span style="font-size:8px;color:${c.muted};">${edu.endDate || ''}</span></div>${edu.school ? `<div style="font-size:8.5px;color:${c.muted};">${edu.school}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>` : ''}</div>`).join('');
    return `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Education')}${items}</div>`;
  };

  const renderSkills = () => {
    if (!allSkills.length) return '';
    const tags = allSkills.slice(0, 20).map(s => `<span style="display:inline-block;padding:2px 6px;margin:1px;background:${c.accent};color:${c.primary};border-radius:2px;font-size:8px;font-weight:500;">${s}</span>`).join('');
    return `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Skills')}<div>${tags}</div></div>`;
  };

  const renderProjects = () => {
    if (!data.projects?.length) return '';
    const items = data.projects.map(p => `<div style="margin-bottom:${sp.item};"><strong style="font-size:9.5px;color:${c.text};">${p.name || 'Project'}</strong>${p.description ? `<p style="font-size:8.5px;color:${c.muted};margin:2px 0 0;line-height:1.4;">${p.description.slice(0, 120)}</p>` : ''}</div>`).join('');
    return `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Projects')}${items}</div>`;
  };

  const renderCertifications = () => {
    if (!data.certifications?.length) return '';
    const items = data.certifications.map(cert => `<div style="font-size:9px;color:${c.text};margin-bottom:3px;">${bullet} ${cert.title}${cert.issuer ? ` - ${cert.issuer}` : ''}</div>`).join('');
    return `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Certifications')}${items}</div>`;
  };

  const renderLanguages = () => {
    if (!data.languages?.length) return '';
    const items = data.languages.map(l => `<span style="font-size:8.5px;color:${c.text};">${l.name}${l.level ? ` (${l.level})` : ''}</span>`).join(' \u2022 ');
    return `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Languages')}<div>${items}</div></div>`;
  };

  const renderAwards = () => {
    if (!data.awards?.length) return '';
    const items = data.awards.map(a => `<div style="font-size:9px;color:${c.text};margin-bottom:3px;">${bullet} ${a.title}${a.issuer ? ` - ${a.issuer}` : ''}</div>`).join('');
    return `<div style="margin-bottom:${sp.section};">${renderSectionTitle('Awards')}${items}</div>`;
  };

  const sectionRenderers: Record<string, () => string> = { summary: renderSummary, experience: renderExperience, education: renderEducation, skills: renderSkills, projects: renderProjects, certifications: renderCertifications, languages: renderLanguages, awards: renderAwards };

  const mainSections = config.sectionOrder.filter(s => s !== 'skills' && s !== 'languages' && s !== 'certifications').map(s => sectionRenderers[s]?.() || '').join('');
  const sidebarSections = config.sectionOrder.filter(s => s === 'skills' || s === 'languages' || s === 'certifications').map(s => sectionRenderers[s]?.() || '').join('');

  let body = '';
  if (config.layout === 'single') {
    body = config.sectionOrder.map(s => sectionRenderers[s]?.() || '').join('');
  } else {
    const mainW = '65%'; const sideW = '32%';
    const sideStyle = config.colors.sidebarBg ? `background:${config.colors.sidebarBg};color:${config.colors.sidebarText || '#fff'};padding:12px;border-radius:4px;` : '';
    if (config.layout === 'sidebar-left') {
      body = `<div style="display:flex;gap:3%;">`
        + `<div style="width:${sideW};${sideStyle}">${sidebarSections || renderSkills() + renderLanguages() + renderCertifications()}</div>`
        + `<div style="width:${mainW};">${mainSections || renderSummary() + renderExperience() + renderEducation() + renderProjects()}</div>`
        + `</div>`;
    } else {
      body = `<div style="display:flex;gap:3%;">`
        + `<div style="width:${mainW};">${mainSections || renderSummary() + renderExperience() + renderEducation() + renderProjects()}</div>`
        + `<div style="width:${sideW};${sideStyle}">${sidebarSections || renderSkills() + renderLanguages() + renderCertifications()}</div>`
        + `</div>`;
    }
  }

  return `<div style="font-family:${config.fonts.body};background:${c.bg};color:${c.text};padding:20px;min-height:100%;font-size:9px;line-height:${sp.line};transform:scale(${scale});transform-origin:top left;width:${scale !== 1 ? `${100/scale}%` : '100%'};">${renderHeader()}${body}</div>`;
}
