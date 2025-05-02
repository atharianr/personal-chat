"use client";

import { useEffect, useRef, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatBubble from "./components/ChatBubble";
import { sendMessage } from "./services/chat-service";

export default function Home() {
  const [chatHistoryList, setChatHistoryList] = useState([]);
  const [secret, setSecret] = useState("")
  const [isLoadingResponse, setIsLoadingResponse] = useState(false)

  // 👇 create ref to the bottom
  const bottomRef = useRef(null);

  // const handleChatSubmit = (newMessage: string) => {
  //   setChatHistoryList((prev) => [
  //     ...prev,
  //     { type: "sender", content: newMessage },
  //     { type: "bot", content: "Saya menerima pesanmu!" }
  //   ]);
  // };

  const handleChatSubmit = async (newMessage) => {
    setChatHistoryList((prev) => [
      ...prev,
      { type: "sender", content: newMessage },
    ]);

    try {
      setIsLoadingResponse(true)
      const response = await sendMessage(newMessage).finally(() => {
        setIsLoadingResponse(false)
      });
      setChatHistoryList((prev) => [
        ...prev,
        // { type: "sender", content: response.input },
        { type: "bot", content: response.response }
      ]);
    } catch (error) {
      console.error("Failed to get bot reply", error);
      setChatHistoryList((prev) => [
        ...prev,
        { type: "bot", content: "Sorry, there was an error processing your message." }
      ]);
    }
  };

  // 👇 scroll to bottom on chat update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistoryList]);

  const handleSecretSubmit = (event) => {
    event.preventDefault();
    if (secret === "nairahta") {
      setSecret("nairahta");
    } else {
      alert("Invalid secret!");
    }
  };

  // 👇 Show secret input popup if not authenticated
  if (secret !== "nairahta") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60">
        <form
          onSubmit={handleSecretSubmit}
          className="bg-white p-6 rounded-xl shadow-xl w-80 space-y-4"
        >
          <h2 className="text-lg font-semibold text-center">Bla bla bla!</h2>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter here..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-black/80 transition"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end h-screen justify-between">
      <div className="overflow-y-auto w-full">
        <div className="flex flex-col  mx-auto pt-4 max-w-2xl w-full">
          {chatHistoryList.map((data, index) => {
            return <ChatBubble chat={data} key={index} />
          })}
          <ChatBubble chat={{ type: "bot", content: "Generating response..." }} className={`${isLoadingResponse ? 'visible' : 'invisible'}`} />
          {/* <p className={`${isLoadingResponse ? 'visible' : 'invisible'}`}>Generating response...</p> */}
          {/* Invisible anchor to scroll to */}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="max-w-2xl w-full bottom-0 mb-2 self-center">
        <ChatBox onChatSubmit={handleChatSubmit} />
      </div>
    </div>
  );
}