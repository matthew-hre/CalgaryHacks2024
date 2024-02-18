"use server";

import { plaidClient } from "@/lib/plaid";
import { createClient } from "@/lib/supabase/server";
import { CountryCode, Products } from "plaid";

export const createLinkToken = async () => {
  "use server";

  try {
    const tokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: process.env.PLAID_CLIENT_ID as string },
      client_name: "Plaid's Tiny Quickstart",
      language: "en",
      products: [Products.Auth],
      country_codes: [CountryCode.Ca],
      redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
    });
    return tokenResponse.data.link_token;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const onSuccess = async (public_token: any) => {
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token: public_token,
  });
  const a_token = exchangeResponse.data.access_token;

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("profiles")
    .update({
      plaid_a_token: a_token,
    })
    .eq("user_id", data.user?.id);

  console.log(error);

  return 1;
};
