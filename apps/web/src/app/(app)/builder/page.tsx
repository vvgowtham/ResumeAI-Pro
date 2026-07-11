'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { renderResume } from '@/lib/template-renderer';
import { ALL_TEMPLATES, getTemplateById } from '@/lib/template-configs';

export default function BuilderPage() {
  const [resume, setResume] = useState<any>(null);
  const [templateId, setTemplateId] = useState('ats-1');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [resumeList, setResumeList] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  // Load template selection from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedTemplateId');
    if (stored) { setTemplateId(stored); localStorage.removeItem('selectedTemplateId'); }
    const storedResumeId = localStorage.getItem('builderResumeId');
    if (storedResumeId) { setSelectedResumeId(storedResumeId); localStorage.removeItem('builderResumeId'); }
  }, []);

  // Fetch resume list
  useEffect(() => {
    api.getResumes().then(setResumeList).catch(() => {});
  }, []);

  // Load selected resume
  useEffect(() => {
    if (selectedResumeId) {
      api.getResume(selectedResumeId).then(r => setResume(r)).catch(() => {});
    } else if (resumeList.length > 0 && !resume) {
      api.getResume(resumeList[0].id).then(r => setResume(r)).catch(() => {});
    }
  }, [selectedResumeId, resumeList]);

  const content = resume?.content || {};
  const template = getTemplateById(templateId) || ALL_TEMPLATES[0];

  const updateContent = (path: string, value: any) => {
    setResume((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev, content: JSON.parse(JSON.stringify(prev.content)) };
      const keys = path.split('.');
      let obj = updated.content;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSave = async () => {
    if (!resume?.id) return;
    setSaving(true);
    try {
      await api.updateResume(resume.id, { content: resume.content, templateId });
      setSavedAt(new Date().toLocaleTimeString());
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async (format: string) => {
    if (!resume?.id) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/resumes/${resume.id}/export/${format}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resume.title}.${format === 'markdown' ? 'md' : format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const sections = [
    { key: 'personalInfo', label: 'Personal Info' },
    { key: 'summary', label: 'Summary' },
    { key: 'experience', label: 'Experience' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'projects', label: 'Projects' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'languages', label: 'Languages' },
  ];

  const personal = content.personalInfo || {};

  return (
    <div className="-m-6 flex h-[calc(100vh-56px)]">
      {/* Left: Sections */}
      <aside className="w-[200px] border-r bg-card p-4 overflow-y-auto flex-shrink-0">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sections</h3>
        {sections.map(s => (
          <div key={s.key} onClick={() => setActiveSection(s.key)} className={`rounded-lg px-3 py-2 text-[13px] cursor-pointer mb-0.5 ${activeSection === s.key ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>{s.label}</div>
        ))}
        {/* Resume selector */}
        {resumeList.length > 1 && (
          <div className="mt-4 pt-4 border-t">
            <label className="text-[10px] font-medium text-muted-foreground">Resume</label>
            <select value={selectedResumeId || ''} onChange={e => setSelectedResumeId(e.target.value)} className="mt-1 w-full rounded border px-2 py-1 text-xs">
              {resumeList.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
            </select>
          </div>
        )}
      </aside>

      {/* Center: Preview */}
      <main className="flex-1 flex flex-col overflow-hidden bg-muted/30">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-card flex-shrink-0">
          <button onClick={handleSave} disabled={saving} className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          {savedAt && <span className="text-xs text-green-600">Saved {savedAt}</span>}
          <span className="flex-1" />
          <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="rounded border px-2 py-1 text-xs">
            {ALL_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select onChange={e => handleExport(e.target.value)} defaultValue="" className="rounded border px-2 py-1 text-xs">
            <option value="" disabled>Export...</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>
        {/* Resume preview */}
        <div className="flex-1 overflow-auto p-6 flex justify-center">
          <div className="w-full max-w-[640px] bg-white shadow-lg rounded min-h-[900px]" dangerouslySetInnerHTML={{ __html: renderResume(content.personalInfo ? content : null, template) }} />
        </div>
      </main>

      {/* Right: Properties */}
      <aside className="w-[260px] border-l bg-card p-4 overflow-y-auto flex-shrink-0">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Properties</h3>

        {activeSection === 'personalInfo' && (
          <div className="space-y-3">
            {['fullName','email','phone','linkedin','github','city','state'].map(key => (
              <div key={key}>
                <label className="text-[10px] font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input value={personal[key] || ''} onChange={e => updateContent(`personalInfo.${key}`, e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        )}

        {activeSection === 'summary' && (
          <div>
            <label className="text-[10px] font-medium text-muted-foreground">Professional Summary</label>
            <textarea value={content.summary || ''} onChange={e => updateContent('summary', e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary min-h-[120px]" />
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-3">
            {(content.experience || []).map((exp: any, i: number) => (
              <div key={i} className="rounded border p-2 space-y-2">
                <input value={exp.title || ''} onChange={e => { const u = [...content.experience]; u[i] = {...u[i], title: e.target.value}; updateContent('experience', u); }} className="w-full rounded border px-2 py-1 text-xs" placeholder="Job Title" />
                <input value={exp.company || ''} onChange={e => { const u = [...content.experience]; u[i] = {...u[i], company: e.target.value}; updateContent('experience', u); }} className="w-full rounded border px-2 py-1 text-xs" placeholder="Company" />
                <div className="flex gap-1">
                  <input value={exp.startDate || ''} onChange={e => { const u = [...content.experience]; u[i] = {...u[i], startDate: e.target.value}; updateContent('experience', u); }} className="flex-1 rounded border px-2 py-1 text-xs" placeholder="Start" />
                  <input value={exp.endDate || ''} onChange={e => { const u = [...content.experience]; u[i] = {...u[i], endDate: e.target.value}; updateContent('experience', u); }} className="flex-1 rounded border px-2 py-1 text-xs" placeholder="End" />
                </div>
              </div>
            ))}
            <button onClick={() => updateContent('experience', [...(content.experience||[]), {id:Math.random().toString(36).slice(2),title:'',company:'',startDate:'',endDate:'',current:false,responsibilities:[],achievements:[]}])} className="text-xs text-primary">+ Add</button>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="space-y-3">
            {(content.education || []).map((edu: any, i: number) => (
              <div key={i} className="rounded border p-2 space-y-2">
                <input value={edu.degree || ''} onChange={e => { const u = [...content.education]; u[i] = {...u[i], degree: e.target.value}; updateContent('education', u); }} className="w-full rounded border px-2 py-1 text-xs" placeholder="Degree" />
                <input value={edu.school || ''} onChange={e => { const u = [...content.education]; u[i] = {...u[i], school: e.target.value}; updateContent('education', u); }} className="w-full rounded border px-2 py-1 text-xs" placeholder="School" />
              </div>
            ))}
            <button onClick={() => updateContent('education', [...(content.education||[]), {id:Math.random().toString(36).slice(2),degree:'',school:'',major:'',gpa:'',startDate:'',endDate:''}])} className="text-xs text-primary">+ Add</button>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-3">
            {Object.entries(content.skills || {}).map(([cat, skills]) => (
              <div key={cat}>
                <label className="text-[10px] font-medium text-muted-foreground capitalize">{cat}</label>
                <input value={Array.isArray(skills) ? (skills as string[]).join(', ') : ''} onChange={e => { const u = {...(content.skills||{})}; (u as any)[cat] = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean); updateContent('skills', u); }} className="mt-1 w-full rounded border px-2 py-1.5 text-xs" placeholder="Comma separated" />
              </div>
            ))}
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="space-y-3">
            {(content.projects || []).map((p: any, i: number) => (
              <div key={i} className="rounded border p-2 space-y-2">
                <input value={p.name || ''} onChange={e => { const u = [...content.projects]; u[i] = {...u[i], name: e.target.value}; updateContent('projects', u); }} className="w-full rounded border px-2 py-1 text-xs" placeholder="Project Name" />
                <textarea value={p.description || ''} onChange={e => { const u = [...content.projects]; u[i] = {...u[i], description: e.target.value}; updateContent('projects', u); }} className="w-full rounded border px-2 py-1 text-xs min-h-[40px]" placeholder="Description" />
              </div>
            ))}
            <button onClick={() => updateContent('projects', [...(content.projects||[]), {id:Math.random().toString(36).slice(2),name:'',description:'',role:'',technologies:[],duration:'',achievements:[]}])} className="text-xs text-primary">+ Add</button>
          </div>
        )}

        {activeSection === 'certifications' && (
          <div className="space-y-2">
            {(content.certifications || []).map((c: any, i: number) => (
              <input key={i} value={c.title || ''} onChange={e => { const u = [...content.certifications]; u[i] = {...u[i], title: e.target.value}; updateContent('certifications', u); }} className="w-full rounded border px-2 py-1.5 text-xs" placeholder="Certification" />
            ))}
            <button onClick={() => updateContent('certifications', [...(content.certifications||[]), {id:Math.random().toString(36).slice(2),title:'',issuer:'',issueDate:'',expiryDate:'',credentialId:''}])} className="text-xs text-primary">+ Add</button>
          </div>
        )}

        {activeSection === 'languages' && (
          <div className="space-y-2">
            {(content.languages || []).map((l: any, i: number) => (
              <div key={i} className="flex gap-1">
                <input value={l.name || ''} onChange={e => { const u = [...content.languages]; u[i] = {...u[i], name: e.target.value}; updateContent('languages', u); }} className="flex-1 rounded border px-2 py-1.5 text-xs" placeholder="Language" />
                <select value={l.level || ''} onChange={e => { const u = [...content.languages]; u[i] = {...u[i], level: e.target.value}; updateContent('languages', u); }} className="w-24 rounded border px-1 py-1.5 text-xs"><option value="">Level</option><option>Native</option><option>Fluent</option><option>Advanced</option><option>Intermediate</option><option>Basic</option></select>
              </div>
            ))}
            <button onClick={() => updateContent('languages', [...(content.languages||[]), {name:'',level:''}])} className="text-xs text-primary">+ Add</button>
          </div>
        )}
      </aside>
    </div>
  );
}
