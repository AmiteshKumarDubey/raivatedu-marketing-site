import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, HelpCircle } from "lucide-react";
import { CoursesFilterView } from "@/components/CoursesFilterView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "All Cohort Courses & Masterclasses",
  description:
    "Explore our complete catalog of cohort-based courses in Full Stack Next.js, AI Agents, UI/UX Design Systems, Cloud DevOps, and Data Science with 1-on-1 mentorship.",
  openGraph: {
    title: "All Cohort Courses & Masterclasses | Raivatedu",
    description:
      "Explore cohort courses in Next.js, AI, UI/UX, Cloud, and Data Science with 1-on-1 mentorship from Google, Stripe, and Figma engineers.",
  },
};

function CoursesSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      <div className="h-32 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <section className="pt-10 pb-12 bg-gradient-to-b from-indigo-50/50 via-white to-transparent dark:from-indigo-950/20 dark:via-slate-900 dark:to-transparent border-b border-slate-100 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="font-semibold text-slate-900 dark:text-white" aria-current="page">
                Courses
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <Badge variant="indigo" size="md" className="mb-3">
              Cohort-Based Programs
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Explore Our Live Masterclasses
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Every course is built around small live cohorts, weekly 1-on-1 mentor code reviews,
              and portfolio-defining capstone projects. Choose your track below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filterable Course List */}
      <SectionWrapper className="pt-8 pb-20">
        <Suspense fallback={<CoursesSkeleton />}>
          <CoursesFilterView />
        </Suspense>

        {/* Bottom Admissions Help Card */}
        <div className="mt-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50/60 to-amber-50/40 dark:from-indigo-950/40 dark:to-amber-950/20 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Not sure which track matches your current experience?
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                Schedule a 15-minute diagnostic call with our senior curriculum advisor. We will review
                your GitHub, past projects, and recommend the optimal cohort level.
              </p>
            </div>
          </div>
          <Button
            href="/#faq"
            variant="primary"
            size="md"
            className="shrink-0"
          >
            Admissions Diagnostic Call
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
}
