import { z } from "zod";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requireAdmin } from "@/app/data/admin/require-admin";

export const fileUploadSchema = z.object({
  fileName: z.string().min(3, { message: "File Name is Required" }),
  contentType: z.string().min(1, { message: "Content Type is Required" }),
  size: z.number().min(1, { message: "Size is Required" }),
  isImage: z.boolean(),
});

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

export const POST = async (request: Request) => {
  const session = await requireAdmin();

  try {
    const decision = await aj.protect(request, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Ratelimiting Exceed..." },
        { status: 429 }
      );
    }
    const body = await request.json();

    const validation = fileUploadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid Request Body" },
        { status: 400 }
      );
    }

    const { fileName, contentType, size } = validation.data;

    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      ContentType: contentType,
      ContentLength: size,
      Key: uniqueKey,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, //URL Expires in 6 mins
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate presign URL" },
      { status: 500 }
    );
  }
};
