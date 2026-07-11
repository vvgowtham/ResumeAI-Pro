'use client';

import { useState } from 'react';

const providers = [
  { name: 'OpenAI', model: 'GPT-4.1', status: 'connected', color: '#10a37f', initial: 'OA' },
  { name: 'Anthropic Claude', model: 'Claude Sonnet 4', status: 'connected', color: '#d4a574', initial: 'AC' },
  { name: 'Google Gemini', model: 'Gemini 2.5 Pro', status: 'disconnected', color: '#4285f4', initial: 'GG' },
  { name: 'OpenRouter', model: 'Auto', status: 'disconnected', color: '#6366f1', initial: 'OR' },
  { name: 'DeepSeek', model: 'DeepSeek V3', status: 'disconnected', color: '#0ea5e9', initial: 'DS' },
  { name: 'Groq', model: 'Llama 3.3', status: 'disconnected', color: '#f97316', initial: 'GQ' },
  { name: 'Ollama', model: 'Local', status: 'disconnected', color: '#374151', initial: 'OL' },
  { name: 'LM Studio', model: 'Custom', status: 'disconnected', color: '#8b5cf6', initial: 'LM' },
];

export default function AiStudioPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Studio</h2>
          <p className="mt-1 text-sm text-muted-foreground">Configure AI providers for resume optimization.</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
          + Add Provider
        </button>
      </div>

      {showAdd && (
        <div className="mb-6 rounded-xl border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Add New Provider</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-muted-foreground">Provider</label><select className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"><option>OpenAI</option><option>Anthropic Claude</option><option>Google Gemini</option><option>OpenRouter</option><option>DeepSeek</option><option>Groq</option><option>Ollama</option><option>LM Studio</option></select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Model</label><select className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"><option>GPT-4.1</option><option>GPT-5</option><option>Claude Sonnet 4</option><option>Gemini 2.5 Pro</option><option>DeepSeek V3</option><option>Llama 3.3</option></select></div>
            <div><label className="text-xs font-medium text-muted-foreground">API Key</label><input type="password" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="sk-..." /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Base URL (optional)</label><input className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="https://api.openai.com/v1" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Temperature</label><input type="number" step="0.1" min="0" max="2" defaultValue="0.7" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Max Tokens</label><input type="number" defaultValue="4096" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Provider</button>
            <button className="rounded-lg border px-4 py-2 text-sm font-medium">Test Connection</button>
            <button onClick={() => setShowAdd(false)} className="rounded-lg px-4 py-2 text-sm text-muted-foreground">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {providers.map((p) => (
          <div key={p.name} className="rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: p.color }}>{p.initial}</div>
              <div><h4 className="text-sm font-semibold">{p.name}</h4><p className="text-[10px] text-muted-foreground">{p.model}</p></div>
            </div>
            <div className="mb-3 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${p.status === 'connected' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={`text-xs ${p.status === 'connected' ? 'text-green-600' : 'text-muted-foreground'}`}>
                {p.status === 'connected' ? 'Connected' : 'Not configured'}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary">Configure</button>
              <button className="rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-primary">Test</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
