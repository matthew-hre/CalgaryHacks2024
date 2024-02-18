"use client";

import { useState } from "react";
import { FiAlertTriangle, FiGithub } from "react-icons/fi";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import Piggy from "@/public/piggy.png";

export default function SignUpPageClient({
  searchParams,
  signUp,
  signInWithGithub,
}: {
  searchParams: { message: string };
  signUp: (formData: FormData) => void;
  signInWithGithub: () => void;
}) {
  const [emailLoading, setEmailLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setEmailLoading(true);
    await signUp(new FormData(e.target));
    setEmailLoading(false);
  };

  const handleGithubSubmit = async (e: any) => {
    e.preventDefault();
    setGithubLoading(true);
    await signInWithGithub();
    setGithubLoading(false);
  };

  return (
    <div className="space-y-4 flex flex-col justify-around min-h-screen">
      <Image
        src={Piggy}
        alt="Piggy bank"
        width={300}
        height={300}
        className="mx-auto"
      />
      <div className="mx-4">
        <h1 className="text-4xl font-bold mb-4 text-[#09BFF6]">Thrift Sweet</h1>
        <p className="mb-4 text-2xl">
          Spending money shouldn&apos;t be stressful. Let&apos;s help you feel
          great about <span className="text-[#09BFF6]">spending it</span>!
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <form onSubmit={handleEmailSubmit} className="space-y-2">
          <Input
            type="email"
            name="email"
            placeholder="name@example.com"
            required
          />

          <Input type="password" name="password" placeholder="••••••••" />
          {emailLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Signing up...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-full bg-[#09BFF6] shadow-sm"
            >
              Sign up
            </Button>
          )}
          {searchParams.message && (
            <p className="text-sm text-red-500 w-full text-center pt-2">
              <FiAlertTriangle className="inline-block w-4 h-4 mr-2" />
              {searchParams.message}
            </p>
          )}
        </form>
        <div className="relative w-1/2 mx-auto">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form onSubmit={handleGithubSubmit}>
          {githubLoading ? (
            <Button disabled variant="outline" className="w-full">
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Authenticating...
            </Button>
          ) : (
            <Button variant="outline" type="submit" className="w-full">
              <FiGithub className="w-4 h-4 mr-2" /> Github
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
