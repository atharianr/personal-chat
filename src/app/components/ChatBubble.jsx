import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatBubble = ({ chat, className }) => {
    return (
        <div className={`max-w-full w-fit ${chat.type == "sender" ? 'self-end ml-16 mr-4 rounded-tr-none bg-gray-700' : 'mr-16 ml-4 rounded-tl-none bg-black'} rounded-2xl py-2 px-4 shadow-lg mb-4 text-white ${className}`}>
            <ReactMarkdown
                // className="prose prose-invert max-w-none"
                components={{
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                            <SyntaxHighlighter
                                language={match[1]}
                                style={oneDark}
                                PreTag="div"
                                {...props}
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

export default ChatBubble;