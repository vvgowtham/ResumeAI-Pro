import { DashboardStats } from '@/components/dashboard/stats';
import { RecentResumes } from '@/components/dashboard/recent-resumes';
import { ResumeScore } from '@/components/dashboard/resume-score';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Gowtham! 👋</h2>
          <p className="text-muted-foreground mt-1">Let&apos;s build your perfect resume that gets you hired.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline">Upload Resume</button>
          <button className="btn-primary">Create Resume</button>
        </div>
      </div>
      <DashboardStats />
      <div className="mt-6 grid grid-cols-[1.6fr_1fr] gap-5">
        <RecentResumes />
        <ResumeScore />
      </div>
    </div>
  );
}
