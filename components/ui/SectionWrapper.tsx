import React from "react";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  as?: "section" | "div";
}

export function SectionWrapper({
  id,
  className = "",
  containerClassName = "",
  children,
  as: Component = "section",
  ...props
}: SectionWrapperProps) {
  return (
    <Component
      id={id}
      className={`py-14 sm:py-20 lg:py-24 transition-colors ${className}`}
      {...props}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </Component>
  );
}
