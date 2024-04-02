import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-neutral-900 border-b-neutral-800 border-b-[1px] text-white p-4">
      <div className="container h-full w-full flex items-center justify-between">
        <div className="branding">
          <h1 className="text-2xl font-bold">NextChat</h1>
        </div>
        <div className="session flex items-center">
          <span>John Doe</span>
          <ShieldCheck size={24} className="h-5 w-5 ms-2" />
        </div>
      </div>
    </header>
  );
}
