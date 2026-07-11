'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_TEMPLATES, getTemplatesByCategory } from '@/lib/template-configs';
import { renderResume, TemplateConfig, CanonicalResume } from '@/lib/template-renderer';

// Sample data for previews (used when user hasn't uploaded yet)
const sampleResume: CanonicalResume = {
  personalInfo: { fullName: 'Alex Johnson', email: 'alex@example.com', phone: '+1 555-0123', address: '', city: 'San Francisco', state: 'CA', country: 'USA', linkedin: 'linkedin.com/in/alexj', github: 'github.com/alexj', portfolio: '', website: '' },
  summary: 'Experienced software professional with 5+ years in full-stack development, specializing in React, Node.js, and cloud architecture. Proven track record of delivering scalable solutions.',
  experience: [
    { id: '1', company: 'TechCorp Inc.', title: 'Senior Software Engineer', location: 'San Francisco, CA', startDate: 'Jan 2022', endDate: '', current: true, responsibilities: ['Led development of microservices architecture serving 2M+ users', 'Mentored team of 5 junior developers', 'Reduced API response time by 40%'], achievements: [] },
    { id: '2', company: 'StartupXYZ', title: 'Software Engineer', location: 'Remote', startDate: 'Mar 2019', endDate: 'Dec 2021', current: false, responsibilities: ['Built real-time dashboard using React and WebSockets', 'Implemented CI/CD pipeline reducing deployment time by 60%'], achievements: [] },
  ],
  education: [{ id: '1', degree: 'B.S. Computer Science', school: 'UC Berkeley', major: 'Computer Science', gpa: '3.8', startDate: '2015', endDate: '2019' }],
  skills: { technical: ['JavaScript', 'TypeScript', 'Python'], soft: ['Leadership', 'Communication'], tools: ['Git', 'Docker', 'VS Code'], frameworks: ['React', 'Next.js', 'NestJS'], languages: [], databases: ['PostgreSQL', 'MongoDB'], cloud: ['AWS', 'GCP'], testing: ['Jest', 'Cypress'], other: [] },
  projects: [{ id: '1', name: 'OpenSource Dashboard', description: 'Real-time analytics platform with 1K+ GitHub stars', role: 'Creator', technologies: ['React', 'D3.js', 'Node.js'], duration: '6 months', achievements: [] }],
  certifications: [{ id: '1', title: 'AWS Solutions Architect', issuer: 'Amazon', issueDate: '2023', expiryDate: '', credentialId: '' }],
  awards: [],
  languages: [{ name: 'English', level: 'Native' }, { name: 'Spanish', level: 'Intermediate' }],
};

export default function TemplatesPage() {
  const [tab, setTab] = useState<'ats' | 'attractive'>('ats');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();

  const templates = useMemo(() => {
    let list = getTemplatesByCategory(tab);
    if (search) list = list.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [tab, search]);

  const handleApply = (template: TemplateConfig) => {
    // Store selected template and navigate to builder
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTemplateId', template.id);
    }
    router.push('/builder');
  };

  return (
    <div>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
          <p className="mt-1 text-sm text-muted-foreground">50 professional templates. Pick one to render your resume instantly.</p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates..."
          className="w-56 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mb-5 flex gap-1 rounded-lg border bg-background p-1 w-fit">
        <button onClick={() => setTab('ats')} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${tab === 'ats' ? 'bg-card shadow-sm font-semibold text-foreground' : 'text-muted-foreground'}`}>ATS Friendly (25)</button>
        <button onClick={() => setTab('attractive')} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${tab === 'attractive' ? 'bg-card shadow-sm font-semibold text-foreground' : 'text-muted-foreground'}`}>Attractive (25)</button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {templates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="group relative cursor-pointer rounded-xl border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary"
            onMouseEnter={() => setHoveredId(tmpl.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Live Preview */}
            <div className="h-[260px] overflow-hidden bg-gray-50 relative">
              <div
                className="pointer-events-none origin-top-left"
                style={{ transform: 'scale(0.32)', width: '312.5%', height: '312.5%' }}
                dangerouslySetInnerHTML={{ __html: renderResume(sampleResume, tmpl) }}
              />
              {/* Hover overlay */}
              {hoveredId === tmpl.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity">
                  <button onClick={() => handleApply(tmpl)} className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm hover:bg-gray-50">Apply</button>
                  <button className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">Preview</button>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold truncate">{tmpl.name}</h4>
                <span className="text-[10px] font-medium text-green-600">ATS {tmpl.atsScore}%</span>
              </div>
              <button className="text-xs text-muted-foreground hover:text-amber-500">\u2606</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
