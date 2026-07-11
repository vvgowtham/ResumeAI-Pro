'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Palette, PenTool, ScanSearch,
  Target, Mail, Linkedin, Bot, History, Download, BarChart3,
  CreditCard, Settings,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/resumes', icon: FileText, label: 'My Resumes' },
  { href: '/templates', icon: Palette, label: 'Templates' },
  { href: '/builder', icon: PenTool, label: 'Resume Builder' },
  { href: '/ats-checker', icon: ScanSearch, label: 'ATS Score Checker' },
  { href: '/job-match', icon: Target, label: 'Job Match' },
  { href: '/cover-letter', icon: Mail, label: 'Cover Letter' },
  { href: '/linkedin', icon: Linkedin, label: 'LinkedIn Optimizer' },
  { href: '/ai-studio', icon: Bot, label: 'AI Studio' },
  { divider: true },
  { href: '/versions', icon: History, label: 'Resume Versions' },
  { href: '/downloads', icon: Download, label: 'Downloads' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/billing', icon: CreditCard, label: 'Billing' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col bg-slate-900 px-3 py-4">
      <div className="mb-6 flex items-center gap-3 px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white">ResumeAI Pro</h1>
          <span className="text-[10px] text-slate-400">Build. Optimize. Get Hired.</span>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5">
        {navItems.map((item, i) => {
          if ('divider' in item) return <div key={i} className="my-2 h-px bg-slate-700/50 mx-3" />;
          const Icon = item.icon!;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-primary-500/15 text-primary-300 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="h-[17px] w-[17px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-3 rounded-xl bg-gradient-to-br from-primary-700 to-purple-600 p-4">
        <h4 className="text-xs font-semibold text-white">Upgrade to Pro</h4>
        <p className="mt-1 text-[10px] text-white/70">Unlock 50+ templates & unlimited AI</p>
        <button className="mt-3 w-full rounded-md bg-white py-1.5 text-xs font-semibold text-primary-600">
          Upgrade Now
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-slate-700/50 px-3 pt-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">
          GV
        </div>
        <div>
          <p className="text-xs font-medium text-slate-200">Gowtham V V</p>
          <p className="text-[10px] text-slate-500">Premium Plan</p>
        </div>
      </div>
    </aside>
  );
}
