import { MetadataRoute } from "next";
import { COURSES } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://raivatedu.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-10-22"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date("2026-10-22"),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = COURSES.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date("2026-10-22"),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];
}
