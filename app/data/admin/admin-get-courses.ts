import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";

export const adminGetCourses = async () => {
  await requireAdmin();

  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      status: true,
      price: true,
      fileKey: true,
      slug: true,
      level: true,
    },
  });

  return data;
};

export type AdminCoursesType = Awaited<ReturnType<typeof adminGetCourses>>[0];
