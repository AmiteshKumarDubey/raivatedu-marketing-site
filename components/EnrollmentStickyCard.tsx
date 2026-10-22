"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Lock,
} from "lucide-react";
import { Course } from "@/data/types";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

interface EnrollmentStickyCardProps {
  course: Course;
}

export function EnrollmentStickyCard({ course }: EnrollmentStickyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("intermediate");
  const [paymentPlan, setPaymentPlan] = useState<"full" | "installment">("full");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const discountPercent = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  const validateModal = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name";
    if (!email.trim() || !email.includes("@")) {
      errs.email = "Please enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateModal()) return;
    setSuccess(true);
  };

  const resetModal = () => {
    setModalOpen(false);
    setSuccess(false);
    setFullName("");
    setEmail("");
    setErrors({});
  };

  const perks = [
    "Intimate cohort of max 15 engineers",
    "Weekly 1-on-1 code reviews with staff mentors",
    "Private Discord & Slack cohort channels",
    "Lifetime access to course materials & recordings",
    "Verified Certificate of Technical Mastery",
    "Direct referrals to 180+ hiring partners",
  ];

  return (
    <>
      {/* Desktop Sticky Card */}
      <aside aria-label="Course Enrollment" className="sticky top-24 z-20 w-full">
        <div className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/80 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xl shadow-indigo-500/5">
          {/* Price Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Cohort Tuition
              </span>
              <Badge variant="emerald" size="sm" className="font-bold">
                Save {discountPercent}%
              </Badge>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                ${course.price}
              </span>
              <span className="text-base text-slate-400 line-through">
                ${course.originalPrice}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              or 3 monthly installments of ${Math.round(course.price / 3)}/mo
            </p>
          </div>

          {/* Urgent Cohort Alert */}
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-semibold">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Only {course.seatsLeft} cohort seats left</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          </div>

          {/* Cohort Details Pill Strip */}
          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pb-5 mb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Cohort Starts:</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {course.nextCohortDate}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Time Commitment:</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                6-8 hrs / week
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Refund Policy:</span>
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                14-day 100% guarantee
              </span>
            </div>
          </div>

          {/* Primary CTA */}
          <Button
            type="button"
            onClick={() => setModalOpen(true)}
            variant="primary"
            size="lg"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
            className="mb-4 shadow-lg shadow-indigo-600/25"
          >
            Apply for Cohort
          </Button>

          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mb-6">
            <Lock className="w-3 h-3 inline mr-1 text-slate-400" />
            No immediate payment required. Admissions diagnostic call first.
          </p>

          {/* Included Perks Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Included in this Masterclass:
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Mobile Sticky Bottom Floating Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3.5 px-4 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              ${course.price}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ${course.originalPrice}
            </span>
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate max-w-[170px] sm:max-w-none">
            {course.seatsLeft} seats left for {course.nextCohortDate}
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setModalOpen(true)}
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Apply Now
        </Button>
      </div>

      {/* Interactive Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={resetModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={resetModal}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Application Submitted!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                  We have reserved your provisional seat for the upcoming cohort of{" "}
                  <strong>{course.title}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1">
                  <p>
                    <strong>Applicant:</strong> {fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                  <p>
                    <strong>Cohort Starts:</strong> {course.nextCohortDate}
                  </p>
                  <p>
                    <strong>Tuition:</strong> ${course.price} (14-day refund guarantee)
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  Our admissions director will email you within 2 hours with the calendar invite for
                  your 15-minute diagnostic call.
                </p>
                <Button type="button" onClick={resetModal} variant="primary" size="md" fullWidth>
                  Done & Back to Course
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <Badge variant="indigo" size="sm" className="mb-2">
                    Cohort Admissions
                  </Badge>
                  <h3 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
                    Apply for {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fill out the quick form below. No payment is taken until after your diagnostic interview.
                  </p>
                </div>

                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label
                      htmlFor="modal-fullname"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="modal-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="modal-exp"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Your Current Experience
                    </label>
                    <select
                      id="modal-exp"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <option value="beginner">Beginner (0-1 years in tech)</option>
                      <option value="intermediate">Intermediate (1-4 years in tech)</option>
                      <option value="advanced">Senior / Lead (5+ years in tech)</option>
                    </select>
                  </div>

                  {/* Payment option */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Preferred Tuition Option
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentPlan("full")}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                          paymentPlan === "full"
                            ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60"
                            : "border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          One-time Payment
                        </p>
                        <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          ${course.price}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentPlan("installment")}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                          paymentPlan === "installment"
                            ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60"
                            : "border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          3-Month Split
                        </p>
                        <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          ${Math.round(course.price / 3)}/mo
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
