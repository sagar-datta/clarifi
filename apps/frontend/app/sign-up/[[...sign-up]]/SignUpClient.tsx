"use client";

import { SignUp } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignUpClient() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to home</span>
      </Button>
      <SignUp />
    </div>
  );
}
