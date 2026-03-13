'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

const CustomCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [label, setLabel] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        // Check for touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setIsHidden(true);
            document.body.style.cursor = 'auto';
            return;
        }

        const dot = dotRef.current;
        const follower = followerRef.current;

        if (!dot || !follower) return;

        // GSAP quickTo for smooth follow
        const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

        const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
        const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Move dot immediately (or very fast)
            xDotTo(clientX);
            yDotTo(clientY);

            // Move follower with lag
            xFollowerTo(clientX);
            yFollowerTo(clientY);
        };

        const onMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.closest('a, button')) {
                gsap.to(follower, {
                    scale: 1.8,
                    backgroundColor: 'rgba(227, 0, 15, 0.2)',
                    borderColor: 'transparent',
                    duration: 0.3
                });
                gsap.to(dot, { scale: 0.5, duration: 0.3 });
            }

            if (target.closest('[data-cursor="view"]')) {
                setLabel('VIEW');
                gsap.to([dot, follower], { opacity: 0, duration: 0.2 });
            }
        };

        const onMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.closest('a, button')) {
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: '#E3000F',
                    duration: 0.3
                });
                gsap.to(dot, { scale: 1, duration: 0.3 });
            }

            if (target.closest('[data-cursor="view"]')) {
                setLabel(null);
                gsap.to(dot, { opacity: 1, duration: 0.2 });
                gsap.to(follower, { opacity: 0.6, duration: 0.2 });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseEnter, true);
        document.addEventListener('mouseout', onMouseLeave, true);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseEnter, true);
            document.removeEventListener('mouseout', onMouseLeave, true);
            document.body.style.cursor = 'auto';
        };
    }, []);

    if (isHidden) return null;

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-[#E3000F] rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
            />

            {/* Follower Ring */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-9 h-9 border-[1.5px] border-[#E3000F] rounded-full z-[9997] pointer-events-none opacity-60 -translate-x-1/2 -translate-y-1/2"
            />

            {/* Custom Label (VIEW) */}
            {label && (
                <div
                    className="fixed top-0 left-0 z-[9999] pointer-events-none font-bold text-white text-[10px] tracking-tighter mix-blend-difference"
                    style={{ transform: 'translate(10px, 10px)' }} // Offset from invisible cursor
                >
                    {label}
                </div>
            )}
        </>
    );
};

export default CustomCursor;
