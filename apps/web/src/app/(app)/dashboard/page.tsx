export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Gowtham! \uD83D\uDC4B</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Let&apos;s build your perfect resume that gets you hired.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-primary">
            Upload Resume
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Create Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Total Resumes</p>
          <p className="mt-2 text-2xl font-bold">12</p>
          <p className="mt-1 text-xs text-green-600">+2 this month</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">ATS Score (Avg.)</p>
          <p className="mt-2 text-2xl font-bold">76%</p>
          <p className="mt-1 text-xs text-green-600">+14% this month</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Job Matches</p>
          <p className="mt-2 text-2xl font-bold">8</p>
          <p className="mt-1 text-xs text-green-600">+3 this month</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Downloads</p>
          <p className="mt-2 text-2xl font-bold">24</p>
          <p className="mt-1 text-xs text-green-600">+8 this month</p>
        </div>
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-5">
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="text-sm font-semibold">Recent Resumes</h3>
            <span className="cursor-pointer text-xs font-medium text-primary">View all</span>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground">Your recent resumes will appear here.</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="text-sm font-semibold">Your Resume Score</h3>
            <span className="cursor-pointer text-xs font-medium text-primary">Full Report</span>
          </div>
          <div className="flex flex-col items-center p-6">
            <div className="text-4xl font-extrabold text-primary">84%</div>
            <p className="mt-2 text-xs text-muted-foreground">Great Score!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
