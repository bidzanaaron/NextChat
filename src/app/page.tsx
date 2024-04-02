import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-[100px]">
      <h1 className="text-3xl font-bold">NextChat</h1>
      <p className="mt-1">Your go-to chat application.</p>
      <div className="actions mt-7">
        <Link href={"/auth"}>
          <Button>
            Join Us <ArrowRight size={20} className="ms-2 h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
