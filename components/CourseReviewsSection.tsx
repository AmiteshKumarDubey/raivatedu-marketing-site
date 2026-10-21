"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ThumbsUp, MessageSquarePlus } from "lucide-react";
import { CourseReview } from "@/data/types";
import { StarRating } from "./ui/StarRating";
import { Button } from "./ui/Button";

interface CourseReviewsSectionProps {
  initialReviews: CourseReview[];
  averageRating: number;
  totalReviewsCount: number;
}

export function CourseReviewsSection({
  initialReviews,
  averageRating,
  totalReviewsCount,
}: CourseReviewsSectionProps) {
  const [reviews, setReviews] = useState<CourseReview[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState<{ [key: string]: boolean }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!role.trim()) newErrors.role = "Please enter your current role";
    if (!comment.trim()) {
      newErrors.comment = "Please provide your feedback";
    } else if (comment.trim().length < 15) {
      newErrors.comment = "Review must be at least 15 characters long";
    }
    if (rating < 1 || rating > 5) newErrors.rating = "Please select a star rating";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newReview: CourseReview = {
      id: `user-rev-${Date.now()}`,
      studentName: name.trim(),
      role: role.trim(),
      company: company.trim() || undefined,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating,
      date: "Just now",
      comment: comment.trim(),
      helpfulCount: 0,
    };

    setReviews([newReview, ...reviews]);
    setSubmittedSuccess(true);
    setName("");
    setRole("");
    setCompany("");
    setRating(5);
    setComment("");
    setErrors({});
  };

  const toggleHelpful = (reviewId: string) => {
    setHelpfulMap((prev) => {
      const isHelpful = !prev[reviewId];
      setReviews((cur) =>
        cur.map((r) =>
          r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + (isHelpful ? 1 : -1) } : r
        )
      );
      return { ...prev, [reviewId]: isHelpful };
    });
  };

  return (
    <div className="w-full">
      {/* Top Ratings Overview Bar */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Student Reviews & Verified Ratings
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Feedback from verified cohort graduates and practicing engineers.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setSubmittedSuccess(false);
            }}
            variant="outline"
            size="md"
            icon={<MessageSquarePlus className="w-4 h-4" />}
          >
            {showForm ? "Close Review Form" : "Write a Review"}
          </Button>
        </div>

        {/* Rating metrics row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 pt-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
              {averageRating.toFixed(2)}
            </span>
            <div>
              <StarRating rating={averageRating} size="lg" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Course rating ({totalReviewsCount} reviews)
              </p>
            </div>
          </div>

          {/* Feature rating pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              Curriculum Quality: <strong>4.9/5</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              Mentor Responsiveness: <strong>5.0/5</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              Career Relevance: <strong>4.9/5</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Review Submission Form (Expandable) */}
      {showForm && (
        <div className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-lg mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Share Your Cohort Experience
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            Your review helps prospective students evaluate curriculum depth and career outcomes.
          </p>

          {submittedSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-200 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Thank you! Your verified review has been submitted and posted below.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Stars Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Overall Rating <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={rating}
                  interactive
                  size="lg"
                  onChange={(val) => setRating(val)}
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {rating} out of 5 stars
                </span>
              </div>
            </div>

            {/* Name & Role Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-500 font-medium" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="review-role"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Current Role / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  id="review-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Frontend Engineer"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
                {errors.role && (
                  <p className="mt-1 text-xs text-rose-500 font-medium" role="alert">
                    {errors.role}
                  </p>
                )}
              </div>
            </div>

            {/* Company (Optional) */}
            <div>
              <label
                htmlFor="review-company"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Company / Organization <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="review-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Razorpay, Startup, or Independent"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="review-comment"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Review & Feedback <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="review-comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe your experience with the curriculum, mentorship, homework assignments, and how it impacted your skills..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
              {errors.comment && (
                <p className="mt-1 text-xs text-rose-500 font-medium" role="alert">
                  {errors.comment}
                </p>
              )}
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" size="md">
                Publish Review
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => {
          const isHelpfulMarked = helpfulMap[rev.id];

          return (
            <article
              key={rev.id}
              className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                    <Image
                      src={rev.avatar}
                      alt={rev.studentName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {rev.studentName}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {rev.role} {rev.company ? `@ ${rev.company}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <StarRating rating={rev.rating} size="sm" />
                  <span className="text-[11px] text-slate-400 mt-1">{rev.date}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {rev.comment}
              </p>

              {/* Helpful count button */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => toggleHelpful(rev.id)}
                  aria-label="Mark review as helpful"
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    isHelpfulMarked
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
