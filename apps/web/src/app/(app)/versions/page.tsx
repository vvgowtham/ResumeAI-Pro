export default function VersionsPage() {
  const versions = [
    { v: 'Current', label: 'Version 5 (Latest)', date: 'May 11, 2025', changes: 'Updated summary, added skills' },
    { v: 'v4', label: 'Version 4', date: 'May 09, 2025', changes: 'Improved experience section' },
    { v: 'v3', label: 'Version 3', date: 'May 07, 2025', changes: 'Changed template' },
    { v: 'v2', label: 'Version 2', date: 'May 03, 2025', changes: 'Added certifications' },
    { v: 'v1', label: 'Version 1', date: 'Apr 28, 2025', changes: 'Initial upload' },
  ];
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Resume Versions</h2><p className="mt-1 text-sm text-muted-foreground">Track and manage all versions.</p></div>
      <div className="space-y-2">
        {versions.map(v => (
          <div key={v.label} className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:border-primary transition-colors">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${v.v === 'Current' ? 'bg-primary/10 text-primary' : 'bg-green-50 text-green-600'}`}>{v.v}</span>
            <div className="min-w-[140px]"><h4 className="text-sm font-semibold">{v.label}</h4><p className="text-[10px] text-muted-foreground">{v.date}</p></div>
            <p className="flex-1 text-xs text-muted-foreground">{v.changes}</p>
            <div className="flex gap-1"><button className="rounded-md border px-2.5 py-1 text-[10px] hover:border-primary">View</button><button className="rounded-md border px-2.5 py-1 text-[10px] hover:border-primary">Restore</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
