import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ShieldCheck,
  Zap,
  Code2,
  Calendar,
  MessageSquare,
  Star,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { COURSES } from "@/data/courses";
import { MENTORS } from "@/data/mentors";
import { TESTIMONIALS } from "@/data/testimonials";
import { FAQS } from "@/data/faqs";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { CourseCard } from "@/components/CourseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { MentorCard } from "@/components/MentorCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { HeroSearch } from "@/components/HeroSearch";

export const metadata = {
  title: "Raivatedu | Elite Cohort-Based Tech & Design Education",
  description:
    "Master Full Stack Next.js, AI Agents, UI/UX Design Systems, and Cloud DevOps through live cohorts and 1-on-1 mentorship from Google, Stripe, and Figma engineers.",
};

export default function HomePage() {
  const featuredCourses = COURSES.filter((c) => c.featured);

  const stats = [
    {
      value: "94%",
      label: "Career Placement Rate",
      description: "Graduates placed in senior & mid-level roles within 180 days",
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    },
    {
      value: "$85K+",
      label: "Average Compensation Hike",
      description: "Across US, European, and top tier Indian tech companies",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
    },
    {
      value: "18,500+",
      label: "Active Alumni Network",
      description: "Working across Google, Stripe, Meta, Figma, Netflix & more",
      icon: <Users className="w-5 h-5 text-indigo-500" />,
    },
    {
      value: "4.92 / 5",
      label: "Student Satisfaction Rating",
      description: "Based on 3,400+ verified post-cohort graduate reviews",
      icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />,
    },
  ];

  const faqAccordionItems = FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    badge: (
      <Badge variant="indigo" size="sm">
        {faq.category}
      </Badge>
    ),
    content: (
      <div className="space-y-2">
        <p>{faq.answer}</p>
      </div>
    ),
  }));

  const companyLogos = [
    "Google",
    "Stripe",
    "Meta",
    "Figma",
    "Amazon",
    "Razorpay",
    "Swiggy",
    "Atlassian",
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-indigo-50/60 via-white to-transparent dark:from-indigo-950/20 dark:via-slate-900 dark:to-transparent">
        {/* Subtle background glow effect */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-500/15 via-amber-400/10 to-transparent blur-3xl pointer-events-none rounded-full animate-float-slow"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Top pill notification */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-900/80 shadow-sm text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-6 hover:border-indigo-400 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Fall Cohort Admissions Open • Limited 15 seats per batch</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
              Master the Skills That{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
                Top Tech Companies
              </span>{" "}
              Actually Hire For
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
              Stop watching isolated video tutorials. Join intimate live cohorts led by staff
              engineers and design leads from Google, Stripe, and Figma. Build production codebases in
              private GitHub repos with 1-on-1 code reviews.
            </p>

            {/* Hero Search Bar */}
            <div className="w-full mb-10">
              <HeroSearch />
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
              <Button
                href="/courses"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore All Courses
              </Button>
              <Button
                href="#mentors"
                variant="outline"
                size="lg"
                icon={<Users className="w-4 h-4" />}
              >
                Meet Our Mentors
              </Button>
            </div>

            {/* Trust Metrics Pill Strip */}
            <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.92 / 5 Student Rating</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>18,500+ Career Placements</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>14-Day Refund Guarantee</span>
              </div>
            </div>
          </div>

          {/* Hiring Partners Logo Strip */}
          <div className="mt-16 pt-10 border-t border-slate-200/70 dark:border-slate-800/70 text-center">
            <p className="text-xs uppercase font-bold tracking-widest text-slate-600 dark:text-slate-300 mb-6">
              Our Alumni Work At Top Engineering & Design Organizations
            </p>
            <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-12 opacity-75 dark:opacity-60">
              {companyLogos.map((brand) => (
                <span
                  key={brand}
                  className="text-base sm:text-lg font-extrabold tracking-tight text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <SectionWrapper id="categories" className="bg-slate-50/50 dark:bg-slate-900/40">
        <SectionHeader
          badge="Curated Learning Tracks"
          title="Popular Categories & Career Paths"
          subtitle="Whether you want to build autonomous AI agents or ship bulletproof React 19 web applications, our tracks are mapped directly to industry job requirements."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </SectionWrapper>

      {/* 3. FEATURED COURSES */}
      <SectionWrapper id="featured-courses">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="indigo" size="md" className="mb-3">
              Flagship Cohorts
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured Masterclasses
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl text-sm sm:text-base">
              Hand-picked intensive courses with live classes starting this month. Includes private GitHub review access and portfolio capstone.
            </p>
          </div>
          <Button
            href="/courses"
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-auto"
          >
            View All 6 Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} featured />
          ))}
        </div>
      </SectionWrapper>

      {/* 4. MENTORS / FACULTY CARDS */}
      <SectionWrapper id="mentors" className="bg-slate-50/50 dark:bg-slate-900/40">
        <SectionHeader
          badge="World-Class Faculty"
          title="Learn Directly from Staff Engineers & Design Leads"
          subtitle="No academic theory from textbooks. Our mentors are active practitioners who build software for hundreds of millions of users every single day."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {/* Mentorship Guarantee Box */}
        <div className="mt-12 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Weekly 1-on-1 Office Hours & Private Slack Access
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Get your code reviewed, discuss architecture bottlenecks, and prepare for interviews directly with faculty.
              </p>
            </div>
          </div>
          <Button href="/courses" variant="primary" size="md">
            Join Next Cohort
          </Button>
        </div>
      </SectionWrapper>

      {/* 5. STUDENT SUCCESS STATS BANNER */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              Verified Career Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Real Numbers, Real Career Transformations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-indigo-200">
              We measure our success solely by our students&apos; career outcomes and salary progression.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-bold text-white mb-2">{stat.label}</p>
                  <p className="text-xs text-indigo-200/80 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS / REVIEWS */}
      <SectionWrapper id="testimonials">
        <SectionHeader
          badge="Alumni Stories"
          title="From Learners to Industry Leaders"
          subtitle="Read how professionals leveraged Raivatedu to pivot their careers, land promotions, and secure six-figure engineering and design roles."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </SectionWrapper>

      {/* 7. FAQ ACCORDION SECTION */}
      <SectionWrapper id="faq" className="bg-slate-50/50 dark:bg-slate-900/40">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Frequently Asked Questions"
            title="Everything You Need to Know Before Joining"
            subtitle="Clear answers to common questions about our cohort format, schedule commitments, mentorship, and refund policy."
            align="center"
          />

          <Accordion
            items={faqAccordionItems}
            defaultOpenId="faq-1"
            allowMultiple={false}
          />

          <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Have another question? Reach out to our admissions team at{" "}
              <a
                href="mailto:admissions@raivatedu.com"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                admissions@raivatedu.com
              </a>{" "}
              or schedule a free 15-minute diagnostic call.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* 8. FOOTER CTA BANNER */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-amber-500 p-8 sm:p-14 text-white shadow-2xl">
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl">
              <Badge variant="amber" size="md" className="mb-4 font-bold text-slate-950">
                Admissions Closing Soon
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                Ready to Accelerate Your Career at Top Tech Companies?
              </h2>
              <p className="text-indigo-100 text-sm sm:text-base leading-relaxed mb-8">
                Join our next live cohort. Learn alongside ambitious peers, build production-grade
                software, and receive direct 1-on-1 mentorship from industry leaders.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  href="/courses"
                  variant="accent"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore All Programs
                </Button>
                <Button
                  href="#faq"
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Admissions FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
