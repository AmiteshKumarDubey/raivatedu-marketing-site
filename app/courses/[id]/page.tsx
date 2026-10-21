import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ChevronRight,
  Clock,
  BarChart,
  CheckCircle2,
  Award,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { COURSES } from "@/data/courses";
import { getCourseBySlug } from "@/data/index";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { StarRating } from "@/components/ui/StarRating";
import { CourseReviewsSection } from "@/components/CourseReviewsSection";
import { EnrollmentStickyCard } from "@/components/EnrollmentStickyCard";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    id: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseBySlug(id);

  if (!course) {
    return {
      title: "Course Not Found | Raivatedu",
    };
  }

  return {
    title: `${course.title} | Raivatedu Masterclass`,
    description: course.shortDescription,
    openGraph: {
      title: `${course.title} | Raivatedu Masterclass`,
      description: course.shortDescription,
      images: [
        {
          url: course.thumbnail,
          width: 800,
          height: 500,
          alt: course.title,
        },
      ],
    },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourseBySlug(id);

  if (!course) {
    notFound();
  }

  const syllabusAccordionItems = course.syllabus.map((mod) => ({
    id: `mod-${mod.moduleNumber}`,
    title: `Module ${mod.moduleNumber}: ${mod.title}`,
    subtitle: `${mod.duration} • ${mod.lessons.length} core topics`,
    badge: (
      <Badge variant="indigo" size="sm">
        {mod.duration}
      </Badge>
    ),
    content: (
      <div className="space-y-4 pt-2">
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {mod.description}
        </p>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
            Key Lessons & Hands-on Labs:
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {mod.lessons.map((lesson, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-1" />
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        {mod.projectTitle && (
          <div className="mt-3 p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-900 flex items-center gap-2.5 text-xs text-indigo-900 dark:text-indigo-200 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Capstone Milestone: {mod.projectTitle}</span>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="min-h-screen pb-24">
      {/* 1. HERO HEADER */}
      <section className="pt-8 pb-12 bg-gradient-to-b from-indigo-50/60 via-white to-transparent dark:from-indigo-950/20 dark:via-slate-900 dark:to-transparent border-b border-slate-100 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
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
              <li>
                <Link
                  href="/courses"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-sm" aria-current="page">
                {course.title}
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex items-center gap-2.5 flex-wrap mb-4">
              <Badge variant="indigo" size="md">
                {course.category}
              </Badge>
              {course.badge && (
                <Badge variant="amber" size="md" className="font-bold">
                  {course.badge}
                </Badge>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {course.level} Level
              </span>
            </div>

            {/* Course Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
              {course.title}
            </h1>

            {/* Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {course.shortDescription}
            </p>

            {/* Metadata & Instructor Banner */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <StarRating
                  rating={course.rating}
                  showValue
                  reviewsCount={course.reviewsCount}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <span>
                  Led by <strong className="text-slate-900 dark:text-white">{course.instructor.name}</strong> ({course.instructor.company})
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>14-Day 100% Refund Guarantee</span>
              </div>
            </div>

            {/* Key Metrics Pill Strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-500 uppercase font-bold">Duration</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{course.duration}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <BarChart className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-500 uppercase font-bold">Curriculum</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{course.hoursTotal} Hours</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <Award className="w-5 h-5 text-purple-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-500 uppercase font-bold">Credential</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Verified Certificate</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-500 uppercase font-bold">Mentorship</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Weekly 1-on-1s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BODY + SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* What you will learn */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                What You Will Master in This Cohort
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Overview Description */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Course Architecture & Mentorship Model
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {course.fullDescription}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  Recommended Prerequisites:
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {course.prerequisites.map((pre, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{pre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Syllabus Accordion Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Detailed Syllabus & Modules
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Click any module to inspect weekly lessons, exercises, and capstone milestones.
                  </p>
                </div>
              </div>

              <Accordion
                items={syllabusAccordionItems}
                defaultOpenId="mod-1"
                allowMultiple
              />
            </div>

            {/* Instructor Bio Box */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-5 mb-5 flex-col sm:flex-row">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-900 shrink-0">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Meet Your Instructor: {course.instructor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <StarRating rating={course.instructor.rating} size="sm" />
                      <span>{course.instructor.rating.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {course.instructor.role} • {course.instructor.company}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Trained {course.instructor.studentsCount} students across {course.instructor.coursesCount} masterclasses
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {course.instructor.bio}
              </p>

              {course.instructor.officeHours && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>Live Office Hours: {course.instructor.officeHours}</span>
                  </span>
                  <span className="text-[11px] text-slate-500">1-on-1 code reviews included</span>
                </div>
              )}
            </div>

            {/* Student Reviews & Form */}
            <div id="reviews">
              <CourseReviewsSection
                initialReviews={course.reviews}
                averageRating={course.rating}
                totalReviewsCount={course.reviewsCount}
              />
            </div>
          </div>

          {/* Right Sidebar: Sticky Enrollment Card */}
          <div className="lg:col-span-4">
            <EnrollmentStickyCard course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}
