"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  X,
  RotateCcw,
  BookOpen,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { COURSES } from "@/data/courses";
import { CATEGORIES } from "@/data/categories";
import { CourseLevel } from "@/data/types";
import { CourseCard } from "./CourseCard";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

type SortOption = "popular" | "price-asc" | "price-desc" | "rating" | "duration";

export function CoursesFilterView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  // Sync state if URL query params change
  const currentCat = searchParams.get("category");
  const currentQ = searchParams.get("search");
  const [prevParams, setPrevParams] = useState({ cat: currentCat, q: currentQ });

  if (prevParams.cat !== currentCat || prevParams.q !== currentQ) {
    setPrevParams({ cat: currentCat, q: currentQ });
    if (currentCat) setSelectedCategory(currentCat);
    if (currentQ !== null && currentQ !== undefined) setSearchQuery(currentQ);
  }

  const categoriesList = ["All", ...CATEGORIES.map((c) => c.name)];
  const levelsList: Array<"All" | CourseLevel> = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      // Category filter
      if (selectedCategory !== "All" && course.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== "All" && course.level !== selectedLevel) {
        return false;
      }

      // Search query (matches title, description, tags, instructor)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.shortDescription.toLowerCase().includes(query);
        const matchesTags = course.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesInstructor) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "duration":
          return a.hoursTotal - b.hoursTotal;
        case "popular":
        default:
          return b.enrollmentCount - a.enrollmentCount;
      }
    });
  }, [selectedCategory, selectedLevel, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSearchQuery("");
    setSortBy("popular");
    router.replace("/courses");
  };

  const hasActiveFilters =
    selectedCategory !== "All" || selectedLevel !== "All" || searchQuery.trim() !== "";

  return (
    <div className="w-full">
      {/* Search & Main Controls Bar */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm mb-8 space-y-5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, tech stack, or keyword..."
            aria-label="Filter courses by keyword"
            className="w-full pl-12 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search text"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills Navigation (Scrollable on mobile) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Browse by Track
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Filter & Sort Dropdown Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {/* Level selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Level:</span>
            </span>
            {levelsList.map((level) => {
              const isSelected = selectedLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800"
                      : "bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>

          {/* Sort By selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label
              htmlFor="sort-select"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-2 pl-3 pr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Shortest Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Strip */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Showing{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {filteredCourses.length}
            </span>{" "}
            {filteredCourses.length === 1 ? "cohort" : "cohorts"}
          </p>
          {hasActiveFilters && (
            <span className="text-xs text-slate-400 dark:text-slate-500">• Filters active</span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset all filters</span>
          </button>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {selectedCategory !== "All" && (
            <Badge variant="indigo" size="sm" className="gap-1.5 py-1">
              <span>Track: {selectedCategory}</span>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                aria-label={`Remove ${selectedCategory} filter`}
                className="hover:text-indigo-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {selectedLevel !== "All" && (
            <Badge variant="amber" size="sm" className="gap-1.5 py-1">
              <span>Level: {selectedLevel}</span>
              <button
                type="button"
                onClick={() => setSelectedLevel("All")}
                aria-label={`Remove ${selectedLevel} filter`}
                className="hover:text-amber-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {searchQuery.trim() !== "" && (
            <Badge variant="neutral" size="sm" className="gap-1.5 py-1">
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Remove search query"
                className="hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        /* Empty State UI */
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No courses found matching your criteria
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
            We couldn&apos;t find any active cohorts for &ldquo;{searchQuery || selectedCategory}&rdquo; with the selected filters.
            Try adjusting your search query or reset the filters to see all available programs.
          </p>
          <Button
            type="button"
            onClick={resetFilters}
            variant="primary"
            size="md"
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
