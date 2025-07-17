"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropdown from "@/app/(root)/_components/UserDropdown";
import { IconInnerShadowTop } from "@tabler/icons-react";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/admin",
  },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="bg-background/90 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <IconInnerShadowTop className="!size-5" />
          <span className="font-bold">TriwanSTUDY.</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navItems.map(({ href, name }) => (
              <Link
                href={href}
                key={name}
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                name={
                  session?.user.name && session?.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "default" })}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
