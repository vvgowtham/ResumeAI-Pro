export default function BillingPage() {
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Billing & Plans</h2><p className="mt-1 text-sm text-muted-foreground">Choose a plan that works for you.</p></div>
      <div className="grid grid-cols-3 gap-5">
        {[{name:'Free',price:'\u20B90',features:['3 Resumes','5 Templates','Basic ATS','PDF Export']},{name:'Pro',price:'\u20B9499',popular:true,features:['Unlimited Resumes','All 50 Templates','AI Optimization','All Exports','Job Match','Cover Letter']},{name:'Business',price:'\u20B91499',features:['Everything in Pro','Team Collaboration','Priority Support','Custom Templates','API Access']}].map(plan => (
          <div key={plan.name} className={`rounded-xl border bg-card p-6 text-center relative ${plan.popular ? 'border-primary' : ''}`}>
            {plan.popular && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold text-primary-foreground">Best Value</div>}
            <h4 className="text-lg font-bold">{plan.name}</h4>
            <div className="my-3 text-3xl font-extrabold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
            <ul className="text-left space-y-2 my-5">{plan.features.map(f => <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground"><span className="text-green-500">\u2713</span>{f}</li>)}</ul>
            <button className={`w-full rounded-lg py-2.5 text-sm font-semibold ${plan.popular ? 'bg-primary text-primary-foreground' : 'border'}`}>{plan.popular ? 'Upgrade Now' : 'Select'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
