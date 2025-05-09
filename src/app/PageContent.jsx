import { useCallback, useEffect, useRef } from "react";
import ChatBox from "./components/ChatBox";
import ChatBubble from "./components/ChatBubble";
import SecretModal from "./components/SecretModal";
import { useChat } from "./contexts/ChatContext";
import { useLoading } from "./contexts/LoadingContext";
import { useSecret } from "./contexts/SecretContext";
import { getChatHistoryBySession, getChatSessionList, sendMessage } from "./services/chat-service";
import { useError } from "./contexts/ErrorContext";
import ErrorModal from "./components/ErrorModal";

export default function PageContent() {
    const {
        chatHistoryList,
        setChatHistoryList,
        chatSessionList,
        setChatSessionList,
        currentChatSessionId,
        setCurrentChatSessionId,
    } = useChat();


    const { isLoadingResponse, setIsLoadingResponse } = useLoading();
    const { secret } = useSecret();

    const { setIsError } = useError();

    const bottomRef = useRef(null);

    const handleChatSubmit = async (newMessage) => {
        setChatHistoryList((prev) => [...prev, { type: "user", content: newMessage }]);

        try {
            setIsLoadingResponse(true);
            const response = await sendMessage(currentChatSessionId, newMessage).finally(() => {
                setIsLoadingResponse(false);
                console.log("currentChatSessionId -> ", currentChatSessionId)
                if (!currentChatSessionId) {
                    getChatSessions();
                }
            });

            setChatHistoryList((prev) => [...prev, { type: "model", content: response.response }]);
        } catch (error) {
            console.error("Failed to get bot reply", error);
            setIsError(true)
            setChatHistoryList((prev) => [
                ...prev,
                { type: "model", content: "Sorry, there was an error processing your message." },
            ]);
        }
    };

    const getChatSessions = useCallback(async () => {
        try {
            const response = await getChatSessionList();
            if (response.data.length > 0) {
                setChatSessionList(response.data);
                if (!currentChatSessionId) {
                    setCurrentChatSessionId(response.data[0].id)
                }
            }
        } catch (error) {
            setIsError(true)
        }
    }, [setChatSessionList]);

    const onSessionClicked = async (sessionId) => {
        setCurrentChatSessionId(sessionId);
        await getChatHistory(sessionId);
    };

    const getChatHistory = async (sessionId) => {
        try {
            const response = await getChatHistoryBySession(sessionId);
            const convertedArray = response.data.map((item) => ({
                type: item.role,
                content: item.parts?.[0]?.text || "",
            }));
            setChatHistoryList(convertedArray);
        } catch (error) {
            setIsError(true)
        }
    };

    useEffect(() => {
        getChatSessions();
    }, [getChatSessions]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistoryList]);

    return (
        <div className="flex">
            <ErrorModal />
            <>{secret !== process.env.NEXT_PUBLIC_SECRET_KEY ? (<SecretModal />) : null}</>
            <div className="fixed flex flex-col left-0 top-0 h-screen w-80 shadow-xl z-10 border-[0.5px] border-gray-300 bg-white">
                <h1 className="text-3xl font-bold p-4">ChatBot</h1>
                {chatSessionList.map((data, index) => (
                    <button
                        key={index}
                        className="py-2 px-4 text-start cursor-pointer"
                        onClick={() => onSessionClicked(data.id)}
                    >
                        <p title={data.sessionName} className={`truncate ${data.id == currentChatSessionId ? 'font-bold' : ''}`}>{data.sessionName}</p>
                    </button>
                ))}
            </div>
            <div className="h-screen w-full ml-0 sm:ml-80">
                <div className="flex flex-col items-end h-screen justify-between">
                    <div className="overflow-y-auto w-full">
                        <div className="flex flex-col mx-auto pt-4 px-4 max-w-2xl w-full">
                            {chatHistoryList.map((data, index) => (
                                <ChatBubble chat={data} key={index} />
                            ))}
                            <ChatBubble chat={{ type: "model", content: "Generating response..." }} className={`${isLoadingResponse ? "block" : "hidden"}`} />
                            <div ref={bottomRef} />
                        </div>
                    </div>
                    <div className="max-w-2xl w-full bottom-0 mb-2 self-center">
                        <ChatBox onChatSubmit={handleChatSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}