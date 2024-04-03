"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../button";

export default function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button disabled={pending}>
        Register
        {pending && (
          <span className="ms-2">
            <Loader2 size={20} className="h-5 w-5 animate-spin" />
          </span>
        )}
      </Button>
    </>
  );
}
