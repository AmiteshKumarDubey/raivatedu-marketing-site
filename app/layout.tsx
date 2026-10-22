import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raivatedu-marketing-site.vercel.app"),
  title: {
    default: "Raivatedu | Elite Cohort-Based Tech & Design Education",
    template: "%s | Raivatedu",
  },
  description:
    "Accelerate your tech career with Raivatedu. Master Full Stack Next.js, AI Agents, UI/UX Design Systems, and Cloud DevOps through live cohorts and 1-on-1 mentorship from Google, Stripe, and Figma leaders.",
  keywords: [
    "Tech Education",
    "Next.js Course",
    "AI Agents",
    "UI/UX Design Systems",
    "Kubernetes Training",
    "Live Mentorship",
    "Coding Cohort",
    "Raivatedu",
  ],
  authors: [{ name: "Raivatedu Team" }],
  creator: "Raivatedu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raivatedu-marketing-site.vercel.app",
    siteName: "Raivatedu",
    title: "Raivatedu | Elite Cohort-Based Tech & Design Education",
    description:
      "Live cohort programs with 1-on-1 mentorship from engineers at Google, Stripe, and Figma. Transform your career in 8 to 12 weeks.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Raivatedu Cohort Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raivatedu | Elite Cohort-Based Tech & Design Education",
    description:
      "Live cohort programs with 1-on-1 mentorship from engineers at Google, Stripe, and Figma.",
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} font-sans`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-600 selection:text-white transition-colors duration-150">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
