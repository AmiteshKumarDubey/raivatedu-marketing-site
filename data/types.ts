export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface SyllabusModule {
  moduleNumber: number;
  title: string;
  duration: string;
  description: string;
  lessons: string[];
  projectTitle?: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  rating: number;
  studentsCount: string;
  coursesCount: number;
  yearsExperience?: number;
  skills?: string[];
  officeHours?: string;
  featuredIn?: string[];
}

export interface Mentor extends Instructor {
  domain: string;
  yearsExperience: number;
  skills: string[];
  officeHours: string;
}

export interface CourseReview {
  id: string;
  studentName: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: "Full Stack Dev" | "AI & Machine Learning" | "UI/UX Design" | "Cloud & DevOps" | "Product Management" | "Data Science";
  badge?: string;
  featured?: boolean;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice: number;
  duration: string;
  hoursTotal: number;
  level: CourseLevel;
  rating: number;
  reviewsCount: number;
  enrollmentCount: number;
  nextCohortDate: string;
  seatsLeft: number;
  thumbnail: string;
  tags: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  certificateProvided: boolean;
  liveMentorship: boolean;
  instructor: Instructor;
  syllabus: SyllabusModule[];
  reviews: CourseReview[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  courseCount: number;
  iconName: string;
  accentColor: string;
  accentBg: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  domain: string;
  yearsExperience: number;
  skills: string[];
  officeHours: string;
}

export interface Testimonial {
  id: string;
  name: string;
  currentRole: string;
  company: string;
  previousRole: string;
  avatar: string;
  quote: string;
  course: string;
  salaryHike: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  category: "Admissions" | "Curriculum" | "Mentorship" | "Career Support";
  question: string;
  answer: string;
}
