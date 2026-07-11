export default function JobMatchPage() {
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Job Match Analyzer</h2><p className="mt-1 text-sm text-muted-foreground">Match your resume with job descriptions.</p></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-5">
          <label className="text-xs font-medium text-muted-foreground">Upload Resume</label>
          <div className="mt-2 rounded-lg border-dashed border-2 p-4 text-center text-xs text-muted-foreground">Senior QA Engineer Resume.pdf</div>
          <label className="mt-4 block text-xs font-medium text-muted-foreground">Paste Job Description</label>
          <textarea className="mt-2 w-full rounded-lg border px-3 py-2.5 text-sm min-h-[160px]" defaultValue="We are looking for a Senior QA Engineer with expertise in test automation, Selenium, API testing, CI/CD..." />
          <button className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground">Analyze Match</button>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-center mb-5"><div className="text-4xl font-extrabold text-primary">85%</div><p className="text-xs text-muted-foreground">Overall Match</p></div>
          {[['Skills Match',80],['Experience Match',85],['Keyword Match',78]].map(([label, val]) => (
            <div key={String(label)} className="mb-3"><div className="flex justify-between text-xs mb-1"><span>{label}</span><span className="font-semibold">{val}%</span></div><div className="h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:`${val}%`}} /></div></div>
          ))}
          <div className="mt-4 pt-4 border-t"><h4 className="text-xs font-semibold mb-2">Missing Keywords</h4><div className="flex flex-wrap gap-1.5">{['Cypress','Docker','Kubernetes','AWS'].map(k => <span key={k} className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-600">{k}</span>)}</div></div>
        </div>
      </div>
    </div>
  );
}
