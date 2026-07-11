'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function ResumeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const fetchResume = useCallback(async () => {
    try {
      const data = await api.getResume(id);
      setResume(data);
    } catch (err) {
      alert('Resume not found');
      router.push('/resumes');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => { fetchResume(); }, [fetchResume]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateResume(id, { content: resume.content, title: resume.title });
    } catch (err: any) {
      alert(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string, value: any) => {
    setResume((prev: any) => {
      const updated = { ...prev, content: { ...prev.content } };
      const keys = path.split('.');
      let obj = updated.content;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  if (loading) return <div className="p-6"><p className="text-sm text-muted-foreground">Loading resume...</p></div>;
  if (!resume) return null;

  const content = resume.content || {};
  const personal = content.personalInfo || {};
  const tabs = ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <input
            value={resume.title}
            onChange={(e) => setResume({ ...resume, title: e.target.value })}
            className="text-xl font-bold bg-transparent outline-none border-b border-transparent hover:border-border focus:border-primary"
          />
          <p className="text-xs text-muted-foreground mt-1">Edit your resume data below, then save or apply a template.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.push('/templates')} className="rounded-lg border px-4 py-2 text-sm font-medium hover:border-primary">Apply Template</button>
          <button onClick={handleSave} disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1 rounded-lg border bg-background p-1 w-fit flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${activeTab === t ? 'bg-card shadow-sm text-foreground font-semibold' : 'text-muted-foreground'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border bg-card p-6">
        {activeTab === 'personal' && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(personal).map(([key, val]) => (
              <div key={key}>
                <label className="text-xs font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  value={String(val || '')}
                  onChange={(e) => updateField(`personalInfo.${key}`, e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'summary' && (
          <div>
            <label className="text-xs font-medium text-muted-foreground">Professional Summary</label>
            <textarea
              value={content.summary || ''}
              onChange={(e) => updateField('summary', e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-primary min-h-[160px]"
            />
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-4">
            {(content.experience || []).map((exp: any, i: number) => (
              <div key={exp.id || i} className="rounded-lg border p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-[10px] font-medium text-muted-foreground">Job Title</label><input value={exp.title || ''} onChange={(e) => { const updated = [...content.experience]; updated[i] = { ...updated[i], title: e.target.value }; updateField('experience', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
                  <div><label className="text-[10px] font-medium text-muted-foreground">Company</label><input value={exp.company || ''} onChange={(e) => { const updated = [...content.experience]; updated[i] = { ...updated[i], company: e.target.value }; updateField('experience', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
                  <div><label className="text-[10px] font-medium text-muted-foreground">Start Date</label><input value={exp.startDate || ''} onChange={(e) => { const updated = [...content.experience]; updated[i] = { ...updated[i], startDate: e.target.value }; updateField('experience', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
                  <div><label className="text-[10px] font-medium text-muted-foreground">End Date</label><input value={exp.endDate || ''} onChange={(e) => { const updated = [...content.experience]; updated[i] = { ...updated[i], endDate: e.target.value }; updateField('experience', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
                </div>
              </div>
            ))}
            <button onClick={() => updateField('experience', [...(content.experience || []), { id: Math.random().toString(36).slice(2), title: '', company: '', startDate: '', endDate: '', current: false, responsibilities: [], achievements: [] }])} className="text-xs text-primary font-medium">+ Add Experience</button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            {(content.education || []).map((edu: any, i: number) => (
              <div key={edu.id || i} className="rounded-lg border p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-[10px] font-medium text-muted-foreground">Degree</label><input value={edu.degree || ''} onChange={(e) => { const updated = [...content.education]; updated[i] = { ...updated[i], degree: e.target.value }; updateField('education', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
                  <div><label className="text-[10px] font-medium text-muted-foreground">School</label><input value={edu.school || ''} onChange={(e) => { const updated = [...content.education]; updated[i] = { ...updated[i], school: e.target.value }; updateField('education', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
                </div>
              </div>
            ))}
            <button onClick={() => updateField('education', [...(content.education || []), { id: Math.random().toString(36).slice(2), degree: '', school: '', major: '', gpa: '', startDate: '', endDate: '' }])} className="text-xs text-primary font-medium">+ Add Education</button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            {Object.entries(content.skills || {}).map(([category, skills]) => (
              <div key={category}>
                <label className="text-xs font-medium text-muted-foreground capitalize">{category}</label>
                <input
                  value={Array.isArray(skills) ? (skills as string[]).join(', ') : ''}
                  onChange={(e) => {
                    const updated = { ...(content.skills || {}) };
                    (updated as any)[category] = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean);
                    updateField('skills', updated);
                  }}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Separate with commas"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            {(content.projects || []).map((proj: any, i: number) => (
              <div key={proj.id || i} className="rounded-lg border p-4">
                <div><label className="text-[10px] font-medium text-muted-foreground">Project Name</label><input value={proj.name || ''} onChange={(e) => { const updated = [...content.projects]; updated[i] = { ...updated[i], name: e.target.value }; updateField('projects', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
                <div className="mt-2"><label className="text-[10px] font-medium text-muted-foreground">Description</label><textarea value={proj.description || ''} onChange={(e) => { const updated = [...content.projects]; updated[i] = { ...updated[i], description: e.target.value }; updateField('projects', updated); }} className="mt-1 w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" /></div>
              </div>
            ))}
            <button onClick={() => updateField('projects', [...(content.projects || []), { id: Math.random().toString(36).slice(2), name: '', description: '', role: '', technologies: [], duration: '', achievements: [] }])} className="text-xs text-primary font-medium">+ Add Project</button>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-3">
            {(content.certifications || []).map((cert: any, i: number) => (
              <div key={cert.id || i} className="flex gap-3 items-center">
                <input value={cert.title || ''} onChange={(e) => { const updated = [...content.certifications]; updated[i] = { ...updated[i], title: e.target.value }; updateField('certifications', updated); }} className="flex-1 rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" placeholder="Certification title" />
                <input value={cert.issuer || ''} onChange={(e) => { const updated = [...content.certifications]; updated[i] = { ...updated[i], issuer: e.target.value }; updateField('certifications', updated); }} className="w-40 rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" placeholder="Issuer" />
              </div>
            ))}
            <button onClick={() => updateField('certifications', [...(content.certifications || []), { id: Math.random().toString(36).slice(2), title: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '' }])} className="text-xs text-primary font-medium">+ Add Certification</button>
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="space-y-3">
            {(content.languages || []).map((lang: any, i: number) => (
              <div key={i} className="flex gap-3 items-center">
                <input value={lang.name || ''} onChange={(e) => { const updated = [...content.languages]; updated[i] = { ...updated[i], name: e.target.value }; updateField('languages', updated); }} className="flex-1 rounded border px-2 py-1.5 text-sm outline-none focus:border-primary" placeholder="Language" />
                <select value={lang.level || ''} onChange={(e) => { const updated = [...content.languages]; updated[i] = { ...updated[i], level: e.target.value }; updateField('languages', updated); }} className="w-32 rounded border px-2 py-1.5 text-sm">
                  <option value="">Level</option><option>Native</option><option>Fluent</option><option>Advanced</option><option>Intermediate</option><option>Basic</option>
                </select>
              </div>
            ))}
            <button onClick={() => updateField('languages', [...(content.languages || []), { name: '', level: '' }])} className="text-xs text-primary font-medium">+ Add Language</button>
          </div>
        )}
      </div>

      {/* Auto-save hint */}
      <p className="mt-4 text-xs text-muted-foreground">Changes are saved when you click Save. Each save creates a new version.</p>
    </div>
  );
}
