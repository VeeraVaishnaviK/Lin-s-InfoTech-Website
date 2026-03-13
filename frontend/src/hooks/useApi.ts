import { useState, useEffect } from 'react';
import api from '@/lib/api';

/**
 * Custom hook for standard GET requests to the backend.
 * @param endpoint - The API path to fetch data from.
 * @returns { data, loading, error }
 */
export function useApi<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(endpoint)
            .then(res => setData(res.data))
            .catch(err => setError(err.response?.data?.message || 'Something went wrong'))
            .finally(() => setLoading(false));
    }, [endpoint]);

    return { data, loading, error };
}
