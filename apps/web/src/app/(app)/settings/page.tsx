export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Settings</h2><p className="mt-1 text-sm text-muted-foreground">Manage your account preferences.</p></div>
      <div className="grid grid-cols-[180px_1fr] gap-6">
        <nav className="space-y-0.5">
          {['Profile', 'Appearance', 'Notifications', 'Security', 'Language', 'AI Providers', 'Export', 'Storage'].map((item, i) => (
            <div key={item} className={`rounded-lg px-3 py-2 text-sm cursor-pointer ${i === 0 ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted'}`}>{item}</div>
          ))}
        </nav>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-base font-semibold mb-5">Profile Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-muted-foreground">Full Name</label><input defaultValue="Gowtham V V" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Email</label><input defaultValue="gowthamvv@gmail.com" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Phone</label><input defaultValue="+91 12345 67890" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Location</label><input defaultValue="Salem, Tamil Nadu, India" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm" /></div>
          </div>
          <button className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
