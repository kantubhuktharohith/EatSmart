import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children }) => (
  <div className={cn(
    // UPDATED: Cleaner white bg with subtle shadow for Light Mode
    "rounded-2xl border border-slate-200/60 bg-white text-slate-950 shadow-sm shadow-slate-200/50",
    // Dark mode styles preserved
    "dark:bg-slate-900 dark:border-slate-800 dark:text-slate-50 dark:shadow-none", 
    className
  )}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={cn("text-lg font-bold leading-none tracking-tight text-slate-800 dark:text-slate-100", className)}>{children}</h3>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("p-6 pt-0", className)}>{children}</div>
);