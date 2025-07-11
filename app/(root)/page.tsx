import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses design by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizes, and assignment to enhace your learning expiriences.",
    icon: "🎮",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievement with detailed analytics and personalized dashboards.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructor to collaborate and share knowladge.",
    icon: "👥",
  },
];

const RootPage = () => {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center space-y-8 text-center">
          <Badge variant="outline">
            The Future of Online Educational Platform
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Elevate Your Learning Experience
          </h1>

          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title, description, icon }) => (
          <Card key={title} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 text-4xl">{icon}</div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
};
export default RootPage;
