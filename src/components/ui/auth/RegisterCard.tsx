"use client";

import { registerUser } from "@/actions";
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
import RegisterButton from "./RegisterButton";

interface props {
  setTab: (tab: string) => void;
}

export default function RegisterCard({ setTab }: props) {
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account here.</CardDescription>
        </CardHeader>
        <form
          action={async (formData: FormData) => {
            const result = await registerUser(formData);

            if (!result.success) {
              setError(result.error);
              return;
            }

            setError(null);
            setTab("login");

            toast({
              title: "Account created!",
              description: "You can now login.",
            });
          }}
        >
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="firstname">Firstname</Label>
              <Input required name="firstname" id="firstname" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Lastname</Label>
              <Input required name="lastname" id="lastname" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input required name="email" id="email" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input required name="username" id="username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input required name="password" id="password" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="repeatPassword">Repeat Password</Label>
              <Input
                name="repeatPassword"
                id="repeatPassword"
                type="password"
                required
              />
            </div>
            <div className="pt-2">
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <RegisterButton />
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
