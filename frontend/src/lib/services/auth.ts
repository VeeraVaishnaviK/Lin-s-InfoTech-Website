import api from '@/lib/api';

export const authService = {
    getMe: async () => {
        const response = await api.get('/api/auth/me');
        return response.data;
    }
};
