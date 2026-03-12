import api from "../api";

export const aiService = {
    chatbot: async (message: string, history: any[] = []) => {
        const response = await api.post("/api/ai/chatbot", { message, history });
        return response.data;
    },

    estimate: async (data: {
        projectType: string;
        features: string[];
        budget: string;
        timeline: string;
    }) => {
        const response = await api.post("/api/ai/estimator", data);
        return response.data;
    },

    generateProposal: async (data: {
        businessType: string;
        features: string[];
        timeline: string;
        budget: string;
    }) => {
        const response = await api.post("/api/ai/proposal", data);
        return response.data;
    },

    analyzeRequirements: async (requirementText: string) => {
        const response = await api.post("/api/ai/analyzer", { requirementText });
        return response.data;
    },

    validateIdea: async (startupIdea: string) => {
        const response = await api.post("/api/ai/validator", { startupIdea });
        return response.data;
    },
};
