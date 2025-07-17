import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const NotAdminPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto w-fit rounded-full p-4">
            <ShieldX className="text-destructive size-16" />
          </div>

          <CardTitle className="text-2xl">Access Restricted</CardTitle>
          <CardDescription className="mx mx-auto max-w-xs">
            Ooops! you are not an admin, which meant you can&apos;t create any
            courses or stuff like that....
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full",
            })}
          >
            <ArrowLeft className="mr-1 size-4" />
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
export default NotAdminPage;
