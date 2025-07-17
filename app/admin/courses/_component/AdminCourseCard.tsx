import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AdminCoursesType } from "@/app/data/admin/admin-get-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Eye,
  MoreVertical,
  Pencil,
  Timer,
  Trash2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminCourseCardProps {
  data: AdminCoursesType;
}

const AdminCourseCard = ({ data }: AdminCourseCardProps) => {
  const thumbnailURL = useConstructUrl(data.fileKey);
  return (
    <Card className="group relative">
      {/* Absolute Dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <Pencil className="mr-4 size-4" /> Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.slug}`}>
                <Eye className="mr-4 size-4" /> Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`}>
                <Trash2 className="text-destructive mr-4 size-4" /> Delete
                Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="">
        <Image
          src={thumbnailURL}
          alt={`${data.title} Thumbnail`}
          width={600}
          height={400}
          className="aspect-video h-full w-full rounded-t-lg object-cover"
        />
      </div>

      <CardContent>
        <Link
          href={`/admin/courses/${data.id}`}
          className="group-hover:text-primary transition-colors: line-clamp-2 font-medium hover:underline"
        >
          {data.title}
        </Link>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Timer className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{data.duration}h</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Award className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{data.level}</p>
          </div>
        </div>

        <Link
          href={`/admin/courses/${data.id}/edit`}
          className={buttonVariants({ className: "mt-4 w-full" })}
        >
          Edit Course <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
};
export default AdminCourseCard;
