"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSessionToken } from "@/lib";
import { Send } from "lucide-react";
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
    const socket = io("ws://localhost:3010");

    socket.on("connect", () => {
      console.log("Connected to the server.");
      setSocket(socket);

      getSessionToken().then((token) => {
        socket.emit("authenticate", {
          token: token,
        });
      });
    });

    socket.on("broadcastMessage", (data) => {
      addMessage(data.message, data.username);
    });
  }, []);

  return (
    <div className="dashboard">
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
