"use client";

import LoginCard from "@/components/ui/auth/LoginCard";
import RegisterCard from "@/components/ui/auth/RegisterCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Auth() {
  const [tab, setTab] = useState<string>("login");

  return (
    <div className="w-full flex mt-[100px] justify-center">
      <Tabs
        defaultValue={"login"}
        value={tab}
        onValueChange={setTab}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginCard />
        </TabsContent>
        <TabsContent value="register">
          <RegisterCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
