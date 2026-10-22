"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      router.push("/courses");
      return;
    }
    router.push(`/courses?search=${encodeURIComponent(query.trim())}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/courses?search=${encodeURIComponent(tag)}`);
  };

  const trendingTags = ["Next.js 16", "AI Agents", "Design Systems", "Kubernetes", "Python ML"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center rounded-2xl md:rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 shadow-xl shadow-indigo-500/5 focus-within:border-indigo-600 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15 transition-all"
      >
        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by skill, topic, or track..."
          aria-label="Search courses"
          className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none pl-11 sm:pl-12 pr-36 sm:pr-40 py-3 sm:py-3.5"
        />
        <button
          type="submit"
          className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl md:rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm cursor-pointer transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
        >
          <span>Find Courses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Suggested Quick Tags */}
      <div className="mt-3.5 flex items-center justify-center flex-wrap gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Popular searches:</span>
        </span>
        {trendingTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/70 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
