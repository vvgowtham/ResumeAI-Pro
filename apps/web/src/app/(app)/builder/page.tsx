export default function BuilderPage() {
  return (
    <div className="-m-6 flex h-[calc(100vh-56px)]">
      <aside className="w-[200px] border-r bg-card p-4 overflow-y-auto">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sections</h3>
        {['Personal Info','Summary','Skills','Experience','Education','Certifications','Projects','Achievements','Languages','Interests'].map((s, i) => (
          <div key={s} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] cursor-grab mb-0.5 ${i === 0 ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'}`}>{s}</div>
        ))}
        <div className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-primary cursor-pointer hover:bg-primary/10">+ Add Section</div>
      </aside>
      <main className="flex-1 flex flex-col items-center overflow-y-auto bg-muted/50 p-6">
        <div className="mb-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 shadow-sm">
          <button className="rounded p-1.5 hover:bg-muted text-xs">Undo</button>
          <button className="rounded p-1.5 hover:bg-muted text-xs">Redo</button>
          <span className="mx-2 h-4 w-px bg-border" />
          <span className="text-xs text-green-600">Saved</span>
          <span className="mx-2 h-4 w-px bg-border" />
          <select className="rounded border px-2 py-1 text-xs"><option>One Page</option><option>Two Page</option></select>
          <select className="rounded border px-2 py-1 text-xs"><option>A4</option><option>Letter</option></select>
          <button className="ml-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Download</button>
        </div>
        <div className="w-full max-w-[600px] rounded bg-white shadow-lg p-10 min-h-[800px]">
          <div className="border-b-2 border-primary pb-4 mb-6">
            <h2 className="text-xl font-bold">GOWTHAM V V</h2>
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Senior QA Engineer</p>
            <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              <span>+91 12345 67890</span><span>gowthamvv@gmail.com</span><span>Salem, Tamil Nadu</span>
            </div>
          </div>
          <div className="mb-5"><h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 border-b pb-1">Professional Summary</h3><p className="text-xs text-muted-foreground leading-relaxed">Senior QA Engineer with 4+ years of experience in manual and automation testing. Expert in Selenium, TestNG, Playwright and API testing.</p></div>
          <div className="mb-5"><h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 border-b pb-1">Experience</h3><div className="mb-3"><div className="flex justify-between"><strong className="text-xs">Senior QA Engineer - IntechHub</strong><span className="text-[10px] text-muted-foreground">Jan 2022 - Present</span></div><ul className="mt-1 list-disc pl-4 text-[11px] text-muted-foreground space-y-0.5"><li>Leading QA team for enterprise web applications</li><li>Designed automation framework using Selenium and TestNG</li><li>Reduced regression defects by 35%</li></ul></div></div>
          <div><h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 border-b pb-1">Skills</h3><div className="flex flex-wrap gap-1.5">{['Selenium','TestNG','Playwright','API Testing','SQL','JIRA','Postman','Git','CI/CD'].map(s => <span key={s} className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{s}</span>)}</div></div>
        </div>
      </main>
      <aside className="w-[250px] border-l bg-card p-4 overflow-y-auto">
        <div className="flex border-b mb-4">{['Content','Design','Layout'].map((t, i) => <div key={t} className={`px-3 py-2 text-xs cursor-pointer ${i === 0 ? 'border-b-2 border-primary text-primary font-semibold' : 'text-muted-foreground'}`}>{t}</div>)}</div>
        <div className="space-y-3">
          <div><label className="text-[11px] font-medium text-muted-foreground">Full Name</label><input defaultValue="Gowtham V V" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="text-[11px] font-medium text-muted-foreground">Job Title</label><input defaultValue="Senior QA Engineer" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="text-[11px] font-medium text-muted-foreground">Email</label><input defaultValue="gowthamvv@gmail.com" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="text-[11px] font-medium text-muted-foreground">Phone</label><input defaultValue="+91 12345 67890" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div className="pt-3 border-t"><label className="text-[11px] font-medium text-muted-foreground">Theme Color</label><div className="mt-2 flex gap-2">{['#7c3aed','#2563eb','#059669','#dc2626','#d97706','#374151'].map(c => <div key={c} className="h-6 w-6 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-foreground" style={{background: c}} />)}</div></div>
        </div>
      </aside>
    </div>
  );
}
