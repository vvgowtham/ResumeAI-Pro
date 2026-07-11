interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'orange' | 'red' | 'blue' | 'purple';
}

const variants = {
  green: 'bg-green-50 text-green-600',
  orange: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
};

export function Badge({ children, variant = 'green' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
