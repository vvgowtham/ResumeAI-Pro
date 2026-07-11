export default function AtsCheckerPage() {
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">ATS Score Checker</h2><p className="mt-1 text-sm text-muted-foreground">Upload any resume and get instant ATS analysis.</p></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border-2 border-dashed bg-card p-10 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
          <div className="text-4xl mb-3">\u2B06</div>
          <h4 className="text-sm font-semibold">Upload your resume</h4>
          <p className="text-xs text-muted-foreground mt-1">Drag & drop or browse. Supports PDF, DOCX, TXT</p>
          <button className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Upload Resume</button>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-center mb-6"><div className="text-4xl font-extrabold text-green-600">87%</div><p className="text-xs text-muted-foreground">ATS Score</p></div>
          <div className="grid grid-cols-2 gap-2">
            {[['Formatting','92%'],['Keywords','78%'],['Content','85%'],['Readability','90%'],['Sections','90%'],['Skills','80%'],['Experience','85%'],['Grammar','94%']].map(([k,v]) => (
              <div key={k} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"><span className="text-xs text-muted-foreground">{k}</span><span className="text-xs font-semibold text-green-600">{v}</span></div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground">Download Full Report (PDF)</button>
        </div>
      </div>
    </div>
  );
}
