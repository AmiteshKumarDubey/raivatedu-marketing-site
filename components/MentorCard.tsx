import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Award, ArrowUpRight } from "lucide-react";
import { Mentor } from "@/data/types";
import { Badge } from "./ui/Badge";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div className="group flex flex-col rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        {/* Mentor Avatar */}
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 shrink-0">
          <Image
            src={mentor.avatar}
            alt={mentor.name}
            fill
            sizes="64px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Name & Title */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {mentor.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{mentor.rating.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold truncate mt-0.5">
            {mentor.role}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
            {mentor.company}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1 line-clamp-3">
        {mentor.bio}
      </p>

      {/* Skills Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {mentor.skills.map((skill) => (
          <span
            key={skill}
            className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Office Hours Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 truncate">
          <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="truncate">{mentor.officeHours}</span>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-0.5 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 shrink-0"
        >
          <span>Cohorts</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
