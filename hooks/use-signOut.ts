"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useSignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("SignOut Successfully");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    });
  };

  return handleSignOut;
};

export default useSignOut;
