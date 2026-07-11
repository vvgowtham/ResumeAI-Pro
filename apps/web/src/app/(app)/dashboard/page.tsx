'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface DashboardStats {
  totalResumes: number;
  avgAtsScore: number;
  jobMatches: number;
  downloads: number;
  recentResumes: Array<{ id: string; title: string; atsScore: number; updatedAt: string }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.request<DashboardStats>('dashboard/stats')
      .then(setStats)
      .catch(() => setStats({ totalResumes: 0, avgAtsScore: 0, jobMatches: 0, downloads: 0, recentResumes: [] }))
      .finally(() => setLoading(false));
  }, []);

  const s = stats || { totalResumes: 0, avgAtsScore: 0, jobMatches: 0, downloads: 0, recentResumes: [] };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Gowtham! \uD83D\uDC4B</h2>
          <p className="mt-1 text-sm text-muted-foreground">Let&apos;s build your perfect resume that gets you hired.</p>
        </div>
        <div className="flex gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-primary">
            <input type="file" className="hidden" accept=".pdf,.docx,.doc,.txt,.html" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                api.uploadResume(file).then(r => router.push(`/resumes/${r.id}`)).catch(err => alert(err.message));
              }
            }} />
            Upload Resume
          </label>
          <button onClick={() => router.push('/builder')} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Create Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Total Resumes</p>
          <p className="mt-2 text-2xl font-bold">{loading ? '-' : s.totalResumes}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">ATS Score (Avg.)</p>
          <p className="mt-2 text-2xl font-bold">{loading ? '-' : s.avgAtsScore > 0 ? `${s.avgAtsScore}%` : 'N/A'}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Job Matches</p>
          <p className="mt-2 text-2xl font-bold">{loading ? '-' : s.jobMatches}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Downloads</p>
          <p className="mt-2 text-2xl font-bold">{loading ? '-' : s.downloads}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-5">
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="text-sm font-semibold">Recent Resumes</h3>
            <span onClick={() => router.push('/resumes')} className="cursor-pointer text-xs font-medium text-primary">View all</span>
          </div>
          <div className="p-5">
            {s.recentResumes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No resumes yet. Upload one to get started.</p>
            ) : (
              <div className="space-y-3">
                {s.recentResumes.map(r => (
                  <div key={r.id} onClick={() => router.push(`/resumes/${r.id}`)} className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:border-primary transition-colors">
                    <span className="text-sm font-medium">{r.title}</span>
                    <span className={`text-xs font-semibold ${r.atsScore >= 80 ? 'text-green-600' : r.atsScore > 0 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {r.atsScore > 0 ? `${r.atsScore}%` : 'New'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="text-sm font-semibold">Your Resume Score</h3>
            <span onClick={() => router.push('/ats-checker')} className="cursor-pointer text-xs font-medium text-primary">Full Report</span>
          </div>
          <div className="flex flex-col items-center p-6">
            <div className="text-4xl font-extrabold text-primary">{s.avgAtsScore > 0 ? `${s.avgAtsScore}%` : '--'}</div>
            <p className="mt-2 text-xs text-muted-foreground">{s.avgAtsScore >= 80 ? 'Great Score!' : s.avgAtsScore > 0 ? 'Room to improve' : 'Upload a resume to get scored'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
