import api from "../api/api";
export const sendMessage = async (message) => {
    const body = {
        message: message
    }
    const response = await api.post("/prompt", body);

    return {
        input: response.data.input,
        response: response.data.response
    };
};
