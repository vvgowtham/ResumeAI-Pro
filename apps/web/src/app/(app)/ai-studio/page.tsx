'use client';

import { useState } from 'react';
import { Bot, Plus, Check, X } from 'lucide-react';

const providers = [
  { name: 'OpenAI', model: 'GPT-4.1', status: 'connected', color: '#10a37f' },
  { name: 'Anthropic Claude', model: 'Claude Sonnet 4', status: 'connected', color: '#d4a574' },
  { name: 'Google Gemini', model: 'Gemini 2.5 Pro', status: 'connected', color: '#4285f4' },
  { name: 'OpenRouter', model: 'Auto', status: 'disconnected', color: '#6366f1' },
  { name: 'DeepSeek', model: 'DeepSeek V3', status: 'disconnected', color: '#0ea5e9' },
  { name: 'Groq', model: 'Llama 3.3', status: 'disconnected', color: '#f97316' },
  { name: 'Ollama (Local)', model: 'Llama 3.3', status: 'disconnected', color: '#374151' },
  { name: 'LM Studio', model: 'Custom', status: 'disconnected', color: '#8b5cf6' },
];

export default function AiStudioPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Studio</h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure AI providers for resume optimization, scoring, and generation.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" /> Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <div key={p.name} className="rounded-xl border bg-white p-5 transition-all hover:shadow-md hover:border-purple-300">
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ background: p.color }}
              >
                {p.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-semibold">{p.name}</h4>
                <p className="text-xs text-gray-400">{p.model}</p>
              </div>
            </div>
            <div className="mb-3 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${p.status === 'connected' ? 'bg-green-500' : 'bg-red-400'}`} />
              <span className={`text-xs font-medium ${p.status === 'connected' ? 'text-green-600' : 'text-gray-400'}`}>
                {p.status === 'connected' ? 'Connected' : 'Not configured'}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border px-3 py-1.5 text-xs font-medium hover:border-purple-300 hover:text-purple-600">
                Configure
              </button>
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-purple-600">
                Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
