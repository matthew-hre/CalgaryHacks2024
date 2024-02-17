"use client";

import { useState } from "react";
import { FiAlertTriangle, FiGithub } from "react-icons/fi";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-4 p-12">
      <h1>Sign Up</h1>
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
          <Button type="submit" className="w-full">
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
      <p className="text-center">Or</p>
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
  );
}
