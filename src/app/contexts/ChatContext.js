import { createContext, useContext, useState } from "react";

const ChatContext = createContext();
ChatContext.displayName = "ChatContext";

export function ChatProvider({ children }) {
    const [chatHistoryList, setChatHistoryList] = useState([]);
    const [chatSessionList, setChatSessionList] = useState([]);
    const [currentChatSessionId, setCurrentChatSessionId] = useState("");

    return (
        <ChatContext.Provider
            value={{
                chatHistoryList,
                setChatHistoryList,
                chatSessionList,
                setChatSessionList,
                currentChatSessionId,
                setCurrentChatSessionId,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
