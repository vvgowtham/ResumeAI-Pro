import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all';
    const variants = {
      primary: 'bg-purple-600 text-white hover:bg-purple-700',
      outline: 'border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:text-purple-600',
      ghost: 'text-gray-500 hover:text-purple-600 hover:bg-purple-50',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
