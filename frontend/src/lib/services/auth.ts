import api from "../api";

export const authService = {
    register: async (userData: any) => {
        const response = await api.post("/api/auth/register", userData);
        return response.data;
    },

    login: async (credentials: any) => {
        const response = await api.post("/api/auth/login", credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/api/auth/logout");
        return response.data;
    },

    getMe: async () => {
        const response = await api.get("/api/auth/me");
        return response.data;
    },
};
