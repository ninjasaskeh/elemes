"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const VerifyRequestPage = () => {
  const [opt, setOpt] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const params = useSearchParams();
  const router = useRouter();
  const isOtpComplete = opt.length === 6;

  const email = params.get("email") as string;

  const verifyOpt = () => {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: opt,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email Verified");
            router.push("/");
          },
          onError: () => {
            toast.error("Error Verifying Email");
          },
        },
      });
    });
  };
  return (
    <Card className="mx-auto w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification email code to your email address. Please
          open the email and paste the code below.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={opt}
            onChange={(value) => setOpt(value)}
            maxLength={6}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Button
          className="w-full"
          onClick={verifyOpt}
          disabled={emailPending || !isOtpComplete}
        >
          {emailPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <span>Verify Account</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
export default VerifyRequestPage;
