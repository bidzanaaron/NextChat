"use client";

import { Button } from "@/components/ui/button";
import Message from "@/components/ui/dashboard/Message";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchLatestMessages, findUserById, getSessionToken } from "@/lib";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Loader2, Send, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface messageSchema {
  id: number;
  message: string;
  sender: string;
  verified: boolean;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<messageSchema[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typingMessage, setTypingMessage] = useState<string>("");
  const [authenticationDialogOpen, setAuthenticationDialogOpen] =
    useState<boolean>(false);

  async function addMessage(userId: number, message: string) {
    const sender = await findUserById(userId);
    setMessages((currentMessages) => [
      {
        id: currentMessages.length + 1,
        message: message,
        sender: sender?.username || "Unknown",
        verified: sender?.verified || false,
      },
      ...currentMessages,
    ]);
  }

  useEffect(() => {
    setAuthenticationDialogOpen(true);

    const socket = io("ws://172.25.2.40:3010");

    socket.on("connect", () => {
      console.log("Connected to the server.");
      setSocket(socket);

      socket.on("authenticationStatus", (data) => {
        setAuthenticationDialogOpen(!data.status);

        if (data.status) {
          fetchLatestMessages().then((data) => {
            let insertData: messageSchema[] = [];
            data.reverse().forEach(async (msg) => {
              insertData.push({
                id: msg.id,
                message: msg.message,
                sender: msg.author.username || "Unknown",
                verified: msg.author.verified || false,
              });
            });

            if (insertData.length > 0) {
              setMessages(insertData);
            }
          });
        }
      });

      getSessionToken().then((token) => {
        socket.emit("authenticate", {
          token: token,
        });
      });
    });

    socket.on("disconnect", () => {
      setAuthenticationDialogOpen(true);
    });

    socket.on(
      "broadcastMessage",
      (data: { userId: number; message: string }) => {
        addMessage(data.userId, data.message);
      }
    );
  }, []);

  return (
    <div className="dashboard">
      <Dialog open={authenticationDialogOpen}>
        <DialogContent>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Please wait while we are authenticating you with our websocket.
            <Loader2 size={24} className="animate-spin mt-4" />
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <div className="title">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-neutral-300">Welcome to the dashboard.</p>
      </div>
      <hr className="my-5" />
      <div className="chat">
        <div className="input-bar flex">
          <form
            className="flex"
            action={async (formData: FormData) => {
              const message = formData.get("message") as string;
              if (!message || message === "") return;

              socket?.emit("sendMessage", {
                message,
              });

              setTypingMessage("");
            }}
          >
            <Input
              name="message"
              value={typingMessage}
              onChange={(element) => setTypingMessage(element.target.value)}
              placeholder="Type a message..."
            />
            <Button className="ms-2" variant={"outline"}>
              <Send size={20} className="h-5 w-5" />
            </Button>
          </form>
        </div>
        <hr className="my-5" />
        <div className="chat">
          {messages.length === 0 && (
            <Loader2 size={36} className="animate-spin" />
          )}
          {messages.map((msg) => (
            <Message
              id={msg.id}
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              verified={msg.verified}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
