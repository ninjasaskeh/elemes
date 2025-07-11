import React from "react";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <GraduationCap className="bg-primary size-8 rounded-sm" />
          TriwanSTUDY.
        </Link>
        {children}

        <div className="text-muted-foreground text-center text-xs text-balance">
          By clicking continue, you agree to our <br />
          <Link href="/#" className="hover:text-primary underline">
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link href="/#" className="hover:text-primary underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
