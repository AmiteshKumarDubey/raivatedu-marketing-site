import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  hoverEffect = false,
  padded = true,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 ${
        hoverEffect
          ? "hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-700/60"
          : ""
      } ${padded ? "p-5 sm:p-6 md:p-8" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
