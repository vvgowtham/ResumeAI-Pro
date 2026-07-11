export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Analytics</h2><p className="mt-1 text-sm text-muted-foreground">Track your resume performance.</p></div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border bg-card p-5"><p className="text-xs text-muted-foreground">Average ATS Score</p><p className="mt-2 text-2xl font-bold text-green-600">76%</p></div>
        <div className="rounded-xl border bg-card p-5"><p className="text-xs text-muted-foreground">Total Downloads</p><p className="mt-2 text-2xl font-bold">24</p></div>
        <div className="rounded-xl border bg-card p-5"><p className="text-xs text-muted-foreground">Job Match Rate</p><p className="mt-2 text-2xl font-bold text-primary">85%</p></div>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h4 className="text-sm font-semibold mb-4">ATS Score Improvement</h4>
        <div className="flex items-end gap-3 h-48">
          {[54,62,68,72,76,80,84].map((v, i) => <div key={i} className="flex-1 flex flex-col items-center gap-1"><span className="text-[10px] font-medium text-muted-foreground">{v}%</span><div className="w-full rounded-t bg-primary/20 hover:bg-primary transition-colors" style={{height: `${v}%`}} /></div>)}
        </div>
        <div className="flex gap-3 mt-2">{['Jan','Feb','Mar','Apr','May','Jun','Jul'].map(m => <span key={m} className="flex-1 text-center text-[10px] text-muted-foreground">{m}</span>)}</div>
      </div>
    </div>
  );
}
