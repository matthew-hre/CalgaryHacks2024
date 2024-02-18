import LoginPageClient from "./LoginPageClient";
import { createClient } from "@/lib/supabase/server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return redirect("/signup?message=Invalid%20credentials");
    }

    return redirect(
      "/signup?message=Check%20your%20email%20for%20a%20login%20link"
    );
  };

  const signInWithGithub = async () => {
    "use server";

    const supabase = createClient();
    const origin = headers().get("origin") as string;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error:", error);
    }

    return redirect(data.url as string);
  };

  return (
    <LoginPageClient
      searchParams={searchParams}
      signIn={signIn}
      signInWithGithub={signInWithGithub}
    />
  );
}
