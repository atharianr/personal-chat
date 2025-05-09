import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();
LoadingContext.displayName = "LoadingContext";

export function LoadingProvider({ children }) {
    const [isLoadingResponse, setIsLoadingResponse] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoadingResponse, setIsLoadingResponse }}>
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
