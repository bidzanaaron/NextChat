import { findUserBySession, getSession, logout } from "@/lib";
import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "./button";

export default async function Header() {
  const session = await getSession();
  const currentUser = await findUserBySession(session);

  return (
    <header className="bg-neutral-900 border-b-neutral-800 border-b-[1px] text-white p-4">
      <div className="container h-full w-full flex items-center justify-between">
        <div className="branding">
          <h1 className="text-2xl font-bold">NextChat</h1>
        </div>
        <div className="session flex items-center">
          <span>{currentUser?.username}</span>
          {currentUser?.verified && (
            <ShieldCheck size={24} className="h-5 w-5 ms-1" />
          )}
          <form
            action={async () => {
              "use server";
              await logout();
              redirect("/auth");
            }}
          >
            <Button className="h-9 ms-4">Logout</Button>
          </form>
        </div>
      </div>
    </header>
  );
}
