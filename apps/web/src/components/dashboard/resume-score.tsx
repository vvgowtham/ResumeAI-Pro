'use client';

export function ResumeScore() {
  return (
    <div className="rounded-xl border bg-white">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="text-sm font-semibold">Your Resume Score</h3>
        <a className="text-xs font-medium text-primary-500 cursor-pointer">Full Report →</a>
      </div>
      <div className="flex flex-col items-center p-6">
        <div className="relative mb-4 h-36 w-36">
          <svg className="-rotate-90" width="144" height="144" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r="62" fill="none" stroke="#f1f1f4" strokeWidth="9" />
            <circle
              cx="72" cy="72" r="62"
              fill="none" stroke="oklch(55% 0.22 270)" strokeWidth="9"
              strokeDasharray="390" strokeDashoffset="62"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-primary-500">84%</span>
            <span className="text-[10px] text-gray-400">Great Score!</span>
          </div>
        </div>
        <p className="mb-4 text-center text-xs text-gray-500">
          Almost there! A few tweaks can make it perfect.
        </p>
        <button className="rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-600 transition-colors">
          Improve Now
        </button>
      </div>
    </div>
  );
}
