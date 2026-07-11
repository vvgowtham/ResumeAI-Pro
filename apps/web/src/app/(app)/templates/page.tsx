'use client';

import { useState } from 'react';
import { Heart, Search } from 'lucide-react';

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
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
          <p className="text-sm text-gray-500 mt-1">Choose from 50+ professional resume templates.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2 w-56">
          <Search className="h-4 w-4 text-gray-400" />
          <input className="bg-transparent text-sm outline-none w-full" placeholder="Search templates..." />
        </div>
      </div>

      <div className="mb-5 flex gap-1 rounded-lg border bg-gray-50 p-1 w-fit">
        <button
          onClick={() => setTab('ats')}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${tab === 'ats' ? 'bg-white shadow-sm font-semibold' : 'text-gray-500'}`}
        >
          ATS Friendly (25)
        </button>
        <button
          onClick={() => setTab('attractive')}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${tab === 'attractive' ? 'bg-white shadow-sm font-semibold' : 'text-gray-500'}`}
        >
          Attractive (25)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {templates.map((name, i) => {
          const score = tab === 'ats' ? 90 + (i % 8) : 75 + (i % 15);
          return (
            <div key={name} className="group cursor-pointer rounded-xl border bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
              <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="w-[70%] h-[80%] bg-white rounded shadow-sm p-2 flex flex-col gap-1">
                  <div className="h-[15%] rounded bg-purple-50" />
                  <div className="h-1.5 rounded bg-gray-200 w-3/4" />
                  <div className="h-1.5 rounded bg-gray-100 w-1/2" />
                  <div className="h-1.5 rounded bg-gray-200 w-2/3" />
                  <div className="h-1.5 rounded bg-gray-100 w-1/2" />
                </div>
                <button className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition">
                  <Heart className="h-3.5 w-3.5 text-red-400" />
                </button>
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
