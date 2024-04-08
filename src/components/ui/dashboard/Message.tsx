import { ShieldCheck, User } from "lucide-react";
import Image from "next/image";

interface props {
  id: number;
  message: string;
  sender: string;
  profilePicture: string;
  verified: boolean;
}

export default function Message({
  id,
  message,
  sender,
  profilePicture,
  verified,
}: props) {
  return (
    <div key={id} className="bg-neutral-900 border mb-3 p-3 rounded">
      <h3 className="text-lg font-semibold flex items-center mb-2">
        {profilePicture && (
          <Image
            src={`/${profilePicture}`}
            alt={sender}
            width={40}
            height={40}
            className="rounded-full me-2 h-[40px] w-[40px] object-cover"
          />
        ) || <div className="rounded-full me-2 h-[40px] w-[40px] bg-neutral-800 flex items-center justify-center"><User /></div>}
        {sender}
        {verified && <ShieldCheck className="ms-1" size={20} />}
      </h3>
      <span>{message}</span>
    </div>
  );
}
