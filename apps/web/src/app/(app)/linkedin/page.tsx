export default function LinkedInPage() {
  const cards = [
    { title: 'LinkedIn Headline', desc: 'Generate a compelling headline for recruiters.' },
    { title: 'About Section', desc: 'Create a professional About section.' },
    { title: 'Experience', desc: 'Optimize experience entries for LinkedIn.' },
    { title: 'Skills & Endorsements', desc: 'Get recommended skills for your industry.' },
    { title: 'SEO Score', desc: 'Analyze your LinkedIn profile searchability.' },
    { title: 'Recommendations', desc: 'Generate recommendation request messages.' },
  ];
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">LinkedIn Optimizer</h2><p className="mt-1 text-sm text-muted-foreground">Generate optimized LinkedIn content.</p></div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map(c => (
          <div key={c.title} className="rounded-xl border bg-card p-5 hover:shadow-md hover:border-primary transition-all">
            <h4 className="text-sm font-semibold mb-1">{c.title}</h4>
            <p className="text-xs text-muted-foreground mb-4">{c.desc}</p>
            <button className="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors">Generate</button>
          </div>
        ))}
      </div>
    </div>
  );
}
