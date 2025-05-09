import React, { useRef } from "react";

export default function ChatBox({ onChatSubmit }) {
    const textareaRef = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const message = formData.get('message')?.toString().trim();

        // Prevent submission if empty or only whitespace/newlines
        if (!message) return;

        console.log('Submitted message:', message);

        // Send back to page.tsx
        if (onChatSubmit) {
            onChatSubmit(message);
        }

        // Clear textarea
        (event.target).reset();

        if (textareaRef.current) {
            textareaRef.current.value = "";
            textareaRef.current.style.height = "24px"; // back to 1 line
        }
    };

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "24px"; // Reset to 1 line
            const maxHeight = 24 * 5; // 5 lines max
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // prevent newline
            const form = event.currentTarget.form;
            if (form) {
                form.requestSubmit(); // trigger form submit
            }
        }
    };

    return (
        <div className='bg-white border-[0.5px] border-gray-300 shadow-2xl rounded-3xl overflow-hidden'>
            <form onSubmit={onSubmit}>
                <textarea
                    ref={textareaRef}
                    name="message"
                    placeholder="Enter your message"
                    required
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    className="mx-4 my-4 h-[24px] block resize-none text-black focus:outline-none overflow-y-auto leading-6"
                    style={{
                        width: "calc(100% - 2rem)", // Adjust for mx-4 (1rem each side)
                        height: "24px", // 1 line
                        maxHeight: "120px", // expands up to 5 lines
                        overflowY: "auto",
                        overflowX: "hidden",
                        whiteSpace: "pre-wrap", // wraps long text
                        wordBreak: "break-word", // breaks long words
                    }}
                />


                <div className="bg-gray-400 h-[0.5px] w-full"></div>

                <button type='submit' className='flex py-3 px-8 my-3 mx-3 w-max bg-black text-white rounded-2xl hover:bg-black/80 duration-500 ml-auto cursor-pointer'>Submit now</button>
            </form>
        </div>
    )
}