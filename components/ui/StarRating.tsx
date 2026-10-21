"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
  reviewsCount?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  showValue = false,
  reviewsCount,
  className = "",
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const currentVal = hoverRating ?? rating;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div
        className="flex items-center gap-0.5"
        role={interactive ? "radiogroup" : "img"}
        aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      >
        {Array.from({ length: maxRating }).map((_, i) => {
          const starIndex = i + 1;
          const isFilled = starIndex <= currentVal;

          if (interactive) {
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={rating === starIndex}
                aria-label={`${starIndex} star${starIndex > 1 ? "s" : ""}`}
                onClick={() => onChange?.(starIndex)}
                onMouseEnter={() => setHoverRating(starIndex)}
                onMouseLeave={() => setHoverRating(null)}
                className="cursor-pointer p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded transition-transform hover:scale-110"
              >
                <Star
                  className={`${starSizes[size]} ${
                    isFilled
                      ? "fill-amber-400 text-amber-400"
                      : "fill-transparent text-slate-300 dark:text-slate-600"
                  } transition-colors`}
                />
              </button>
            );
          }

          return (
            <Star
              key={i}
              className={`${starSizes[size]} ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-slate-300 dark:text-slate-600"
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>

      {showValue && (
        <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
          {rating.toFixed(1)}
        </span>
      )}

      {typeof reviewsCount === "number" && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
