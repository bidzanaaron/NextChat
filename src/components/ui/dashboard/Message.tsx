import { ShieldCheck } from "lucide-react";

interface props {
  key: number;
  message: string;
  sender: string;
  verified: boolean;
}

export default function Message({ key, message, sender, verified }: props) {
  return (
    <div key={key} className="bg-neutral-900 border mb-3 p-3 rounded">
      <h3 className="text-lg font-semibold flex items-center">
        {sender}
        {verified && <ShieldCheck className="ms-1" size={20} />}
      </h3>
      <span>{message}</span>
    </div>
  );
}
