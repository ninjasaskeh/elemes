import "server-only";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export const adminGetCourse = async (id: string) => {
  await requireAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      slug: true,
      smallDescription: true,
      category: true,
      chapter: {
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailKey: true,
              videoKey: true,
              position: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourse>>;
//chapter: {
//         select: {
//           id: true,
//           title: true,
//           position: true,
//           lessons: {
//             select: {
//               id: true,
//               title: true,
//               description: true,
//               thumbnailKey: true,
//               videoKey: true,
//               position: true,
//             },
//           },
//         },
//       },
