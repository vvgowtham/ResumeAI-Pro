'use client';

import { FileText, TrendingUp, Target, Download } from 'lucide-react';

const stats = [
  { label: 'Total Resumes', value: '12', change: '+2 this month', icon: FileText, color: 'purple' },
  { label: 'ATS Score (Avg.)', value: '76%', change: '+14% this month', icon: TrendingUp, color: 'green' },
  { label: 'Job Matches', value: '8', change: '+3 this month', icon: Target, color: 'orange' },
  { label: 'Downloads', value: '24', change: '+8 this month', icon: Download, color: 'blue' },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-xl border bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-${stat.color}-50`}>
                <Icon className={`h-[17px] w-[17px] text-${stat.color}-500`} />
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="mt-1 text-xs font-medium text-green-600">{stat.change}</div>
          </div>
        );
      })}
    </div>
  );
}
