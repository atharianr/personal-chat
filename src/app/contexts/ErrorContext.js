import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();
ErrorContext.displayName = "ErrorContext";

export function ErrorProvider({ children }) {
    const [isError, setIsError] = useState(false)

    return (
        <ErrorContext.Provider value={{ isError, setIsError }}>
            {children}
        </ErrorContext.Provider>
    );
}

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within a ErrorContext");
    }
    return context;
};
