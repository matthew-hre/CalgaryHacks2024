import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user?.data?.user?.id)
    .single();

  if (error) {
    console.error(error);
    return redirect("/login");
  }

  if (data.first_name === null) {
    return redirect("/onboarding");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      add stuff here later
    </main>
  );
}
