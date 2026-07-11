'use client';

import { Eye, Pencil, Download, Trash2, Upload, Plus } from 'lucide-react';

const resumes = [
  { name: 'Senior QA Engineer Resume', score: 91, date: 'May 11, 2025', pages: 2 },
  { name: 'Software Test Engineer Resume', score: 85, date: 'May 09, 2025', pages: 2 },
  { name: 'Automation Tester Resume', score: 78, date: 'May 07, 2025', pages: 1 },
  { name: 'Project Manager Resume', score: 72, date: 'Apr 28, 2025', pages: 2 },
  { name: 'Business Analyst Resume', score: 75, date: 'Apr 20, 2025', pages: 2 },
  { name: 'Data Analyst Resume', score: 68, date: 'Apr 15, 2025', pages: 1 },
];

export default function ResumesPage() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Resumes</h2>
          <p className="text-sm text-gray-500 mt-1">Manage, edit and track all your resumes.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:border-purple-300">
            <Upload className="h-4 w-4" /> Upload
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">
            <Plus className="h-4 w-4" /> Create New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumes.map((r) => (
          <div key={r.name} className="rounded-xl border bg-white p-5 transition-all hover:shadow-md hover:border-purple-300 cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold">{r.name}</h4>
                <p className="text-xs text-gray-400 mt-1">Last edited: {r.date}</p>
              </div>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                r.score >= 85 ? 'bg-green-50 text-green-600' : r.score >= 70 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
              }`}>{r.score}%</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-xs text-gray-400">{r.pages} Page{r.pages > 1 ? 's' : ''}</span>
              <div className="flex gap-1">
                <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-purple-50"><Eye className="h-3.5 w-3.5" /></button>
                <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-purple-50"><Pencil className="h-3.5 w-3.5" /></button>
                <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-purple-50"><Download className="h-3.5 w-3.5" /></button>
                <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
