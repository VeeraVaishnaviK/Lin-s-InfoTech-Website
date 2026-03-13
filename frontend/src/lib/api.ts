import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    withCredentials: true,  // sends httpOnly JWT cookie automatically
    headers: { 'Content-Type': 'application/json' }
});

// Response interceptor: on 401 → redirect to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                window.location.href = '/client-portal';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
