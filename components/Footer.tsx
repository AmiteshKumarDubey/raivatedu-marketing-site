"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  CheckCircle2,
  ArrowRight,
  Globe,
  Heart,
} from "lucide-react";
import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./ui/SocialIcons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please provide a valid email address");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  const programs = [
    { name: "Full Stack Next.js 16", href: "/courses/modern-full-stack-nextjs-typescript" },
    { name: "Production AI Agents & LLMs", href: "/courses/ai-agents-llm-applications" },
    { name: "Design Systems & UI/UX", href: "/courses/design-systems-product-uiux" },
    { name: "Kubernetes & AWS Cloud", href: "/courses/cloud-devops-kubernetes-aws" },
    { name: "Product Management for Tech", href: "/courses/product-management-tech-leaders" },
    { name: "Data Science with Python", href: "/courses/applied-data-science-machine-learning-python" },
  ];

  const platform = [
    { name: "Browse All Courses", href: "/courses" },
    { name: "Meet Our Mentors", href: "/#mentors" },
    { name: "Student Success Stories", href: "/#testimonials" },
    { name: "Admissions FAQ", href: "/#faq" },
    { name: "Hiring Partner Network", href: "/courses" },
  ];

  const resources = [
    { name: "Engineering Curriculum Guide", href: "/courses" },
    { name: "Tech Salary Benchmarks 2026", href: "/courses" },
    { name: "Open Source Projects", href: "https://github.com" },
    { name: "Career Transition Playbook", href: "/courses" },
    { name: "Design System Tokens Spec", href: "/courses" },
  ];

  const company = [
    { name: "About Raivatedu", href: "/#why-us" },
    { name: "Faculty & Advisory", href: "/#mentors" },
    { name: "Careers at Raivatedu", href: "/courses" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center text-white shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Raivatedu
                </span>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
                Raivatedu is an elite cohort-based learning platform. We connect ambitious developers,
                designers, and product builders with active staff engineers and design leaders from
                world-class tech companies.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X profile"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub organization"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn page"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube channel"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
              >
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Join the Raivatedu Insider Newsletter
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Get monthly engineering teardowns, syllabus deep dives, and early scholarship access.
              No spam, unsubscribe anytime.
            </p>

            {subscribed ? (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>You are subscribed! We will send your first tech teardown this Thursday.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1 relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your personal or work email"
                    aria-label="Email address for newsletter"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  />
                  {error && (
                    <p className="mt-1.5 text-xs text-rose-500 font-medium" role="alert">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programs.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {platform.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Raivatedu Inc. All rights reserved. Crafted for high-impact careers.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>Global Cohorts (Remote-First)</span>
            </span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for ambitious builders
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
