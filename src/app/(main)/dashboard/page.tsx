"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello, how can I help you?",
      sender: "bot",
    },
    {
      id: 2,
      message: "I need help with my account.",
      sender: "user",
    },
  ]);

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

              setMessages([
                {
                  id: messages.length + 1,
                  message: message,
                  sender: "user",
                },
                ...messages,
              ]);
            }}
          >
            <Input name="message" placeholder="Type a message..." />
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
