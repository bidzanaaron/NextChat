"use client";

import { login } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { useToast } from "../use-toast";
import LoginButton from "./LoginButton";

export default function LoginCard() {
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log into your account here.</CardDescription>
        </CardHeader>
        <form
          action={async (formData: FormData) => {
            const result = await login(formData);

            if (result.error) {
              setError(result.error);
              return;
            } else {
              toast({
                description: "Erfolgreich eingeloggt.",
              });

              router.push("/dashboard");
            }
          }}
        >
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input required name="username" id="username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input required name="password" id="password" type="password" />
            </div>
            <div className="pt-2">
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <LoginButton />
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
