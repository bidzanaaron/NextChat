"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getSessionToken } from "@/lib";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Dashboard() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "This is the start of the conversation.",
      sender: "Server",
    },
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typingMessage, setTypingMessage] = useState<string>("");
  const [authenticationDialogOpen, setAuthenticationDialogOpen] =
    useState<boolean>(false);

  function addMessage(message: string, sender: string) {
    setMessages((currentMessages) => [
      {
        id: currentMessages.length + 1,
        message: message,
        sender: sender,
      },
      ...currentMessages,
    ]);
  }

  useEffect(() => {
    setAuthenticationDialogOpen(true);

    setTimeout(() => {
      const socket = io("ws://172.25.2.40:3010");

      socket.on("connect", () => {
        console.log("Connected to the server.");
        setSocket(socket);

        socket.on("authenticationStatus", (data) => {
          setAuthenticationDialogOpen(!data.status);
        });

        getSessionToken().then((token) => {
          socket.emit("authenticate", {
            token: token,
          });
        });
      });

      socket.on("broadcastMessage", (data) => {
        addMessage(data.message, data.username);
      });
    }, 2000);
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
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-neutral-900 border mb-3 p-3 rounded"
            >
              <h3 className="text-lg font-semibold">{msg.sender}</h3>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
