import { COURSES } from "./courses";
import { MENTORS } from "./mentors";
import { CATEGORIES } from "./categories";
import { TESTIMONIALS } from "./testimonials";
import { FAQS } from "./faqs";
import { Course } from "./types";

export * from "./types";
export { COURSES, MENTORS, CATEGORIES, TESTIMONIALS, FAQS };

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((c) => c.featured);
}

export function getAllCourses(): Course[] {
  return COURSES;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug || c.id === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  if (!category || category === "All") return COURSES;
  return COURSES.filter((c) => c.category === category);
}

export function getMentorById(id: string) {
  return MENTORS.find((m) => m.id === id);
}
