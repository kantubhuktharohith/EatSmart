import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400", // Dark mode
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };