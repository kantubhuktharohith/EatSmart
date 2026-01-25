import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ children, className, variant = 'default' }) => {
  const variants = {
    default: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    outline: "text-slate-800 border border-slate-200",
    secondary: "bg-slate-100 text-slate-800"
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 border-transparent", variants[variant], className)}>
      {children}
    </div>
  );
};