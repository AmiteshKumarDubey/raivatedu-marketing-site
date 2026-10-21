import React from "react";
import Link from "next/link";
import {
  Code2,
  Bot,
  Palette,
  Cloud,
  Compass,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Category } from "@/data/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-6 h-6" };
    switch (iconName) {
      case "Code2":
        return <Code2 {...iconProps} />;
      case "Bot":
        return <Bot {...iconProps} />;
      case "Palette":
        return <Palette {...iconProps} />;
      case "Cloud":
        return <Cloud {...iconProps} />;
      case "Compass":
        return <Compass {...iconProps} />;
      case "BarChart3":
        return <BarChart3 {...iconProps} />;
      default:
        return <Code2 {...iconProps} />;
    }
  };

  return (
    <Link
      href={`/courses?category=${encodeURIComponent(category.name)}`}
      className="group relative flex flex-col p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${category.accentBg} ${category.accentColor}`}
        >
          {getIcon(category.iconName)}
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          {category.courseCount} Courses
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
        {category.name}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
        {category.description}
      </p>

      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
        <span>Explore Track</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
