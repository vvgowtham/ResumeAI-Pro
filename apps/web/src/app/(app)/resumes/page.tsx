'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface ResumeItem {
  id: string;
  title: string;
  atsScore: number;
  status: string;
  pages: number;
  isFavorite: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ResumesPage() {
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [search, setSearch] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const router = useRouter();

  const fetchResumes = useCallback(async () => {
    try {
      const data = await api.getResumes();
      setResumes(data);
    } catch (err) {
      console.error('Failed to fetch resumes', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchResumes(); }, [fetchResumes]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(10);
    try {
      const interval = setInterval(() => {
        setUploadProgress(p => Math.min(p + 15, 90));
      }, 300);

      const result = await api.uploadResume(file);
      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        router.push(`/resumes/${result.id}`);
      }, 500);
    } catch (err: any) {
      alert(err.message || 'Upload failed');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resume?')) return;
    await api.deleteResume(id);
    setResumes(r => r.filter(x => x.id !== id));
  };

  const handleDuplicate = async (id: string) => {
    const result = await api.request<ResumeItem>(`resumes/${id}/duplicate`, { method: 'POST' });
    setResumes(r => [result, ...r]);
  };

  const handleFavorite = async (id: string) => {
    const result = await api.request<ResumeItem>(`resumes/${id}/favorite`, { method: 'POST' });
    setResumes(r => r.map(x => x.id === id ? { ...x, isFavorite: result.isFavorite } : x));
  };

  const filtered = resumes.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Resumes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Upload, manage, and track all your resumes.</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <input type="file" className="hidden" accept=".pdf,.docx,.doc,.txt,.html" onChange={handleFileInput} />
          Upload Resume
        </label>
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mb-6 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-border'
        }`}
      >
        {uploading ? (
          <div>
            <p className="text-sm font-medium">Uploading & parsing...</p>
            <div className="mt-3 mx-auto max-w-xs h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{uploadProgress}%</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium">Drag & drop your resume here</p>
            <p className="mt-1 text-xs text-muted-foreground">Supports PDF, DOCX, DOC, TXT, HTML (max 10MB)</p>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resumes..."
          className="w-full max-w-sm rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      {/* Resume Grid */}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">No resumes yet. Upload your first resume to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary">
              <div className="flex items-start justify-between mb-3">
                <div className="cursor-pointer" onClick={() => router.push(`/resumes/${r.id}`)}>
                  <h4 className="text-sm font-semibold">{r.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(r.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  r.atsScore >= 85 ? 'bg-green-50 text-green-600' : r.atsScore >= 70 ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-500'
                }`}>{r.atsScore > 0 ? `${r.atsScore}%` : 'New'}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex gap-1">
                  <button onClick={() => handleFavorite(r.id)} className={`flex h-7 w-7 items-center justify-center rounded-md border text-xs ${r.isFavorite ? 'bg-amber-50 border-amber-300 text-amber-500' : 'hover:bg-muted'}`}>
                    {r.isFavorite ? '\u2605' : '\u2606'}
                  </button>
                  <button onClick={() => handleDuplicate(r.id)} className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-muted text-xs">\u2398</button>
                  <button onClick={() => handleDelete(r.id)} className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-red-50 hover:border-red-200 text-xs">\u2715</button>
                </div>
                <button onClick={() => router.push(`/resumes/${r.id}`)} className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
