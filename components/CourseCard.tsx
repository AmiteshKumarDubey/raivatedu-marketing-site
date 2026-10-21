import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, BarChart, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { Course } from "@/data/types";
import { Badge } from "./ui/Badge";
import { StarRating } from "./ui/StarRating";
import { Button } from "./ui/Button";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export function CourseCard({ course, featured = false }: CourseCardProps) {
  const discountPercent = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <article
      className="group flex flex-col rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300"
      aria-labelledby={`course-title-${course.id}`}
    >
      {/* Thumbnail Banner */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={course.thumbnail}
          alt={`Thumbnail for ${course.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={featured}
          loading={featured ? undefined : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <Badge variant="indigo" size="sm" className="bg-white/95 dark:bg-slate-900/95 shadow-sm">
            {course.category}
          </Badge>
          {course.badge && (
            <Badge variant="amber" size="sm" className="font-bold shadow-sm">
              {course.badge}
            </Badge>
          )}
        </div>

        {/* Cohort Date Badge */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-xs font-medium text-white/95 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Next Cohort: {course.nextCohortDate}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Rating & Level */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <StarRating
            rating={course.rating}
            size="sm"
            showValue
            reviewsCount={course.reviewsCount}
          />
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3
          id={`course-title-${course.id}`}
          className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-2"
        >
          <Link href={`/courses/${course.slug}`} className="focus-visible:outline-none focus-visible:underline">
            {course.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 flex-1">
          {course.shortDescription}
        </p>

        {/* Metadata Strip */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 py-3 border-y border-slate-100 dark:border-slate-800/80 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{course.duration} ({course.hoursTotal}h)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Live Mentorship</span>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate">
              {course.instructor.name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {course.instructor.role} • {course.instructor.company}
            </p>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                ${course.price}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${course.originalPrice}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Save {discountPercent}%
            </span>
          </div>

          <Button
            href={`/courses/${course.slug}`}
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
