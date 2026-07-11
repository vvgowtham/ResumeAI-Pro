export default function DownloadsPage() {
  const files = [
    { name: 'Senior QA Engineer Resume.pdf', type: 'PDF', size: '245 KB', date: 'May 11, 2025' },
    { name: 'Senior QA Engineer Resume.docx', type: 'DOCX', size: '120 KB', date: 'May 11, 2025' },
    { name: 'Senior QA Engineer Resume.jpg', type: 'JPG', size: '450 KB', date: 'May 09, 2025' },
    { name: 'ATS Report.pdf', type: 'PDF', size: '200 KB', date: 'May 07, 2025' },
  ];
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Downloads</h2><p className="mt-1 text-sm text-muted-foreground">All your downloaded files.</p></div>
      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-muted/50"><th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">File Name</th><th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Type</th><th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Size</th><th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Date</th></tr></thead>
          <tbody>{files.map(f => <tr key={f.name} className="border-b last:border-0"><td className="px-5 py-3 text-sm font-medium">{f.name}</td><td className="px-5 py-3"><span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{f.type}</span></td><td className="px-5 py-3 text-xs text-muted-foreground">{f.size}</td><td className="px-5 py-3 text-xs text-muted-foreground">{f.date}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
