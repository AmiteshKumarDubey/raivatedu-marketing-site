import React from "react";
import Image from "next/image";

import { Testimonial } from "@/data/types";
import { StarRating } from "./ui/StarRating";
import { Badge } from "./ui/Badge";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      <div>
        {/* Top Header: Rating & Salary Hike Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <StarRating rating={testimonial.rating} size="sm" />
          <Badge variant="emerald" size="sm" className="font-bold">
            {testimonial.salaryHike}
          </Badge>
        </div>

        {/* Quote text */}
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Student Profile & Career Transition */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3.5">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 truncate">
            {testimonial.currentRole} @ {testimonial.company}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            Formerly {testimonial.previousRole}
          </p>
        </div>
      </div>
    </div>
  );
}
