"use client";

import { registerUser } from "@/lib";
import { useState } from "react";
import { Button } from "../button";
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

export default function RegisterCard() {
  const [error, setError] = useState<string | null>(null);

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
          }}
        >
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="firstname">Firstname</Label>
              <Input name="firstname" id="firstname" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Lastname</Label>
              <Input name="lastname" id="lastname" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input name="username" id="username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="repeatPassword">Repeat Password</Label>
              <Input
                name="repeatPassword"
                id="repeatPassword"
                type="password"
              />
            </div>
            <div className="pt-2">
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
