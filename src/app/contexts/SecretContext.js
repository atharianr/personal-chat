import { createContext, useContext, useState } from "react";

const SecretContext = createContext();
SecretContext.displayName = "SecretContext";

export function SecretProvider({ children }) {
    const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

    const [secret, setSecret] = useState("");

    const handleSecretSubmit = (event) => {
        event.preventDefault();
        if (secret === SECRET_KEY) {
            setSecret(SECRET_KEY);
        } else {
            alert("Invalid secret!");
        }
    };

    return (
        <SecretContext.Provider value={{ secret, setSecret, handleSecretSubmit }}>
            {children}
        </SecretContext.Provider>
    );
}

export const useSecret = () => {
    const context = useContext(SecretContext);
    if (!context) {
        throw new Error("useSecret must be used within a SecretProvider");
    }
    return context;
};
