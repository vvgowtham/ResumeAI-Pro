'use client';

import { Eye, Pencil, Download } from 'lucide-react';

const resumes = [
  { name: 'Software QA Engineer Resume', score: 91, date: 'May 11, 2025' },
  { name: 'Senior QA Tester Resume', score: 78, date: 'May 09, 2025' },
  { name: 'Automation Test Lead Resume', score: 85, date: 'May 07, 2025' },
  { name: 'Project Manager Resume', score: 72, date: 'May 03, 2025' },
];

export function RecentResumes() {
  return (
    <div className="rounded-xl border bg-white">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="text-sm font-semibold">Recent Resumes</h3>
        <a className="text-xs font-medium text-primary-500 cursor-pointer">View all</a>
      </div>
      <div className="p-5">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              <th className="pb-3">Resume Name</th>
              <th className="pb-3">ATS Score</th>
              <th className="pb-3">Last Edited</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((r) => (
              <tr key={r.name} className="border-t border-gray-100">
                <td className="py-3 text-sm font-medium">{r.name}</td>
                <td className="py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    r.score >= 85 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>{r.score}%</span>
                </td>
                <td className="py-3 text-xs text-gray-400">{r.date}</td>
                <td className="py-3">
                  <div className="flex gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-purple-50 hover:border-purple-300">
                      <Eye className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-purple-50 hover:border-purple-300">
                      <Pencil className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-purple-50 hover:border-purple-300">
                      <Download className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
