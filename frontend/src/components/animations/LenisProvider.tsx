'use client';

import React, { useEffect, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisProviderProps {
    children: ReactNode;
}

const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // Connect to GSAP ticker
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        // Direct GSAP ticker integration as requested
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Update ScrollTrigger on scroll
        lenis.on('scroll', ScrollTrigger.update);

        // Start RAF
        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove(raf);
        }
    }, []);

    return <>{children}</>;
};

export default LenisProvider;
