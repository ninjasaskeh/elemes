import { z } from "zod";

export const courseLevel = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategory = [
  "Development",
  "Bussines",
  "Finance",
  "IT & Software",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
  "Others",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title must be at most 100 characters long." }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." })
    .max(1000, {
      message: "Description must be at most 1000 characters long.",
    }),
  fileKey: z
    .string()
    .min(3, { message: "File key must be at least 3 characters long." }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1." }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour." })
    .max(500, { message: "Duration must be at most 500 hours." }),
  level: z.enum(courseLevel, {
    message: "Level must be Beginner, Intermediate, or Advanced.",
  }),
  category: z.enum(courseCategory, { message: "Category must be selected." }),
  smallDescription: z
    .string()
    .min(3, {
      message: "Small description must be at least 3 characters long.",
    })
    .max(250, {
      message: "Small description must be at most 250 characters long.",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." }),
  status: z.enum(courseStatus, {
    message: "Status must be Draft, Published, or Archived.",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
