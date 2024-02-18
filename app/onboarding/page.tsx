import { createClient } from "@/lib/supabase/server";
import OnboardingPageClient from "./OnboardingPageClient";
import { redirect } from "next/navigation";

export default async function Onboarding({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const submitInformation = async (formData: FormData, step: number) => {
    "use server";

    const response = formData.get("response") as string;
    const supabase = createClient();

    const user_id = (await supabase.auth.getUser()).data?.user?.id;

    if (!user_id) {
      return redirect("/login?message=You%20must%20be%20logged%20in");
    }

    const rows = [
      "first_name",
      "monthly_income",
      "monthly_rent",
      "monthly_groceries",
      "monthly_gas",
      "savings_goal",
    ];

    const { error } = await supabase
      .from("profiles")
      .update({
        [rows[step]]: response,
      })
      .eq("user_id", user_id);

    if (error) {
      console.error(error);
    }

    console.log("response #", step, response);

    if (step + 1 > 5) {
      return redirect("/?message=Onboarding%20complete");
    }
  };

  return (
    <OnboardingPageClient
      submitInformation={submitInformation}
      searchParams={searchParams}
    />
  );
}
