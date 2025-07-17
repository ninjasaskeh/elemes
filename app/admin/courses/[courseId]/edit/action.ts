"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { APIResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { prisma } from "@/lib/db";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 10,
    })
  );

export const EditCourse = async (
  data: CourseSchemaType,
  courseId: string
): Promise<APIResponse> => {
  const user = await requireAdmin();

  try {
    const req = await request();
    const desicion = await aj.protect(req, {
      fingerprint: user.user.id,
    });

    if (desicion.isDenied()) {
      if (desicion.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Rate limit exceeded. Please try again later.",
        };
      } else {
        return {
          status: "error",
          message: "Bot activity detected, please contact support!",
        };
      }
    }

    const result = courseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid Data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch {
    return { status: "error", message: "Invalid Data" };
  }
};
