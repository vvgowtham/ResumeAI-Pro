'use client';

import { Search, Bell, Zap } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-7 py-3">
      <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3.5 py-2 w-72">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search resumes, templates, settings..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          1,250 Credits
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100">
          <Bell className="h-[17px] w-[17px] text-gray-500" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-[10px] font-semibold text-white">
          GV
        </div>
      </div>
    </header>
  );
}
