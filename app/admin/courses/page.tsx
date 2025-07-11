import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const CoursesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Courses
        </Link>
      </div>

      <div className="">
        <h1>Here you will see all the courses</h1>
      </div>
    </>
  );
};
export default CoursesPage;
