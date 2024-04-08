import { findUserBySession, getSession, logout } from "@/lib";
import {
  ArrowDownNarrowWide,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export default async function Header() {
  const session = await getSession();
  const currentUser = await findUserBySession(session);

  return (
    <header className="bg-neutral-900 border-b-neutral-800 border-b-[1px] text-white p-4">
      <div className="container h-full w-full flex items-center justify-between">
        <div className="branding">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold">NextChat</h1>
          </Link>
        </div>
        <div className="session flex items-center">
          <span>{currentUser?.username}</span>
          {currentUser?.verified && (
            <ShieldCheck size={24} className="h-5 w-5 ms-1" />
          )}
          <div className="dropdown flex items-center ms-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ArrowDownNarrowWide size={20} className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
