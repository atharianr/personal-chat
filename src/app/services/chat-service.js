import api from "../api/api";

export const getChatSessionList = async () => {
    try {
        const response = await api.get("/session/get-list");
        return response.data
    } catch (error) {
        throw error
    }
}

export const getChatHistoryBySession = async (sessionId) => {
    try {
        const response = await api.get(`/session/${sessionId}/chat-history`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const sendMessage = async (sessionId, message) => {
    try {
        const body = {
            sessionId: sessionId,
            message: message
        }
        const response = await api.post("/prompt", body);

        return {
            input: response.data.input,
            response: response.data.response
        }
    } catch (error) {
        throw error
    }
};
