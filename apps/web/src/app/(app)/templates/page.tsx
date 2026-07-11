'use client';

import { useState } from 'react';

const atsTemplates = [
  'Clean Professional','Executive','Corporate','Modern ATS','Simple ATS',
  'Compact ATS','Harvard','Oxford','Stanford','Google',
  'Microsoft','Amazon','Meta','Apple','QA Engineer',
  'Software Engineer','Developer','Product Manager','Business Analyst','Finance',
  'Healthcare','Legal','Education','Minimal ATS','International ATS',
];

const attractiveTemplates = [
  'Canva Style','Creative','Premium','Luxury','Portfolio',
  'Timeline','Modern Gradient','Glassmorphism','Dark Mode','Purple',
  'Blue','Green','Orange','Red','Gold',
  'Startup','Magazine','Neo Brutalism','Elegant','Corporate Premium',
  'Professional Designer','Minimal Color','Creative Blocks','Designer CV','Resume Pro',
];

export default function TemplatesPage() {
  const [tab, setTab] = useState<'ats' | 'attractive'>('ats');
  const templates = tab === 'ats' ? atsTemplates : attractiveTemplates;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
        <p className="mt-1 text-sm text-muted-foreground">Choose from 50+ professional resume templates.</p>
      </div>

      <div className="mb-5 flex gap-1 rounded-lg border bg-background p-1 w-fit">
        <button
          onClick={() => setTab('ats')}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'ats' ? 'bg-card shadow-sm font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          ATS Friendly (25)
        </button>
        <button
          onClick={() => setTab('attractive')}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'attractive' ? 'bg-card shadow-sm font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Attractive (25)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {templates.map((name, i) => {
          const score = tab === 'ats' ? 90 + (i % 8) : 75 + (i % 15);
          return (
            <div
              key={name}
              className="group cursor-pointer rounded-xl border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary"
            >
              <div className="relative h-52 bg-gradient-to-br from-background to-muted flex items-center justify-center">
                <div className="w-[70%] h-[80%] rounded bg-card shadow-sm p-2 flex flex-col gap-1">
                  <div className="h-[15%] rounded bg-primary/10" />
                  <div className="h-1.5 rounded bg-muted w-3/4" />
                  <div className="h-1.5 rounded bg-muted/60 w-1/2" />
                  <div className="h-1.5 rounded bg-muted w-2/3" />
                  <div className="h-1.5 rounded bg-muted/60 w-1/2" />
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-xs font-semibold truncate">{name}</h4>
                <span className="text-[10px] font-medium text-green-600">ATS Score {score}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
