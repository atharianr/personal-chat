import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatBubble({ chat, className }) {
    return (
        <div className={`flex flex-col max-w-full whitespace-pre-wrap ${chat.type == "user" ? 'self-end ml-16 rounded-tr-none bg-gray-700' : 'self-start mr-16 rounded-tl-none bg-black'} rounded-2xl py-2 px-4 shadow-lg mb-4 text-white ${className}`}>
            <ReactMarkdown
                components={{
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                            <SyntaxHighlighter
                                language={match[1]}
                                style={oneDark}
                                PreTag="div"
                                {...props}
                                className={`${className}`}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >{chat.content}</ReactMarkdown>
        </div>
    )
}