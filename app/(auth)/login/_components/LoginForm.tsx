"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Loader, Loader2, LucideMail, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  const signInWithGithub = () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Successfully logged in with Github, you will be directed.."
            );
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  };

  const signInWithEmail = () => {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification email sent");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>
          Login with your Github or Email Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          className="w-full hover:cursor-pointer"
          variant="outline"
          onClick={signInWithGithub}
          disabled={githubPending}
        >
          {githubPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Github className="mr-2 h-4 w-4" />
              <span>Sign in with Github</span>
            </>
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john.doe@example.com"
            />
          </div>

          <Button
            onClick={signInWithEmail}
            disabled={emailPending}
            className="hover:cursor-pointer"
          >
            {emailPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Send className="mr-2 size-4" />
                <span>Sign in with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
