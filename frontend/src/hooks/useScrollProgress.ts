'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook that returns the current vertical scroll percentage (0-100).
 */
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;

            const totalScrollable = documentHeight - windowHeight;
            const currentProgress = totalScrollable > 0 ? (scrollY / totalScrollable) * 100 : 0;

            setProgress(currentProgress);
        };

        let rafId: number;
        const update = () => {
            handleScroll();
            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, []);

    return progress;
}
