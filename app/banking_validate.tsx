"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { createLinkToken, onSuccess } from "./store_a_token";

export default function BankAuthButton() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const get_token = async () => {
      const link_token = await createLinkToken();
      console.log(link_token);
      setToken(link_token);
    };
    get_token();
  }, []);

  const { open, ready } = usePlaidLink({ token, onSuccess });

  return (
    <Button onClick={() => open()} disabled={!ready}>
      Link Account
    </Button>
  );
}
