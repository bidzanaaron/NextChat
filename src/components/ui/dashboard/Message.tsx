"use client";

import { ShieldCheck, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

interface props {
  id: number;
  message: string;
  sender: string;
  profilePicture: string;
  verified: boolean;
}

const emojis: {
  [key: string]: string;
} = {
  ":)": "😊",
  ":(": "😢",
  ":D": "😄",
  ":P": "😛",
  ":O": "😲",
  ":|": "😐",
  ":/": "😕",
  ":*": "😘",
  ":$": "🤑",
  ":!": "😲",
  ":@": "😠",
  ":#": "🤐",
  ":^": "🤔",
  ":&": "🤗",
  ":%": "🤒",
  ":+": "🤕",
  ":;": "😉",
  ":,": "😊",
  ":<": "😞",
  ":>": "😠",
  ":?": "😕",
  ":\\": "😕",
};

export default function Message({
  id,
  message,
  sender,
  profilePicture,
  verified,
}: props) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  return (
    <div key={id} className="bg-neutral-900 border mb-3 p-3 rounded">
      <h3 className="text-lg font-semibold flex items-center mb-2">
        {(profilePicture && (
          <Image
            src={`/${profilePicture}`}
            alt={sender}
            width={40}
            height={40}
            className="rounded-full me-2 h-[40px] w-[40px] object-cover"
          />
        )) || (
          <div className="rounded-full me-2 h-[40px] w-[40px] bg-neutral-800 flex items-center justify-center">
            <User />
          </div>
        )}
        {sender}
        {verified && <ShieldCheck className="ms-1" size={20} />}
      </h3>
      <span>
        {message.split(" ").map((word, index) => {
          if (word.startsWith("http") || word.startsWith("https")) {
            return (
              <Dialog key={index} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <span
                    onClick={() => setUrl(word)}
                    key={index}
                    className="text-blue-500 cursor-pointer transition-colors hover:text-blue-600"
                  >
                    {word}{" "}
                  </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      You are about to open a link you received in a message,
                      please be sure that this link is safe before proceeding.
                    </DialogDescription>
                  </DialogHeader>
                  {url}
                  <DialogFooter>
                    <Button
                      variant={"secondary"}
                      onClick={async () => setOpen(false)}
                    >
                      Abort
                    </Button>
                    <Button
                      onClick={async () => {
                        setOpen(false);
                        window.open(url, "_blank");
                      }}
                    >
                      Continue
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            );
          }
          if (emojis[word]) {
            return (
              <span key={index} className="emoji">
                {emojis[word]}{" "}
              </span>
            );
          }
          return word + " ";
        })}
      </span>
    </div>
  );
}
