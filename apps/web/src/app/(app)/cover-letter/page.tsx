export default function CoverLetterPage() {
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Cover Letter Generator</h2><p className="mt-1 text-sm text-muted-foreground">Create personalized cover letters in seconds.</p></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <div><label className="text-xs font-medium text-muted-foreground">Job Title</label><input defaultValue="Senior QA Engineer" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm" /></div>
          <div><label className="text-xs font-medium text-muted-foreground">Company Name</label><input defaultValue="IntechHub Software" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm" /></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="text-xs font-medium text-muted-foreground">Tone</label><select className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm"><option>Professional</option><option>Friendly</option><option>Executive</option></select></div><div><label className="text-xs font-medium text-muted-foreground">Language</label><select className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm"><option>English</option><option>Tamil</option><option>Hindi</option></select></div></div>
          <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground">Generate Cover Letter</button>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h4 className="text-sm font-semibold mb-3">Generated Cover Letter</h4>
          <div className="text-xs text-muted-foreground leading-relaxed space-y-2"><p>Dear Hiring Manager,</p><p>I am writing to express my interest in the Senior QA Engineer position at IntechHub Software. With over 4 years of experience in software testing and automation, I am confident in my ability to contribute.</p><p>Sincerely, Gowtham V V</p></div>
          <div className="mt-4 pt-3 border-t flex gap-2"><button className="rounded-md border px-3 py-1.5 text-xs">Copy</button><button className="rounded-md border px-3 py-1.5 text-xs">Download</button><button className="rounded-md border px-3 py-1.5 text-xs">Edit</button></div>
        </div>
      </div>
    </div>
  );
}
