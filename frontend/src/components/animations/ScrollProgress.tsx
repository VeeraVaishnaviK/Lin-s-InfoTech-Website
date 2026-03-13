'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const ScrollProgress: React.FC = () => {
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!progressBarRef.current) return;

        const tl = gsap.to(progressBarRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={progressBarRef}
            className="fixed top-0 left-0 right-0 h-[2px] bg-brand-red z-[9999] origin-left scale-x-0"
        />
    );
};

export default ScrollProgress;
