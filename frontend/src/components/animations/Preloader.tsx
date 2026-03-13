'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const Preloader: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [counter, setCounter] = useState(0);
    const overlayRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if user has visited in this session
        const hasVisited = sessionStorage.getItem('visited');
        if (hasVisited) {
            setIsVisible(false);
            return;
        }

        // Set visited in sessionStorage
        sessionStorage.setItem('visited', 'true');

        // Counter Logic
        let startTimestamp: number | null = null;
        const duration = 1800; // 1.8s

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progressRatio = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progressRatio * 100);

            setCounter(currentCount);

            if (progressRatio < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);

        // GSAP Animation Timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setIsVisible(false);
            }
        });

        tl.to(progressRef.current, {
            width: '100%',
            duration: 1.8,
            ease: 'power1.inOut',
        })
            .to([logoRef.current, counterRef.current, progressRef.current], {
                opacity: 0,
                duration: 0.3,
                delay: 0.2, // 200ms wait
            })
            .to(overlayRef.current, {
                yPercent: -100,
                duration: 0.7,
                ease: 'power3.inOut',
            });

        return () => {
            tl.kill();
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 bg-[#0A0A0A] z-[9999] flex flex-col items-center justify-center p-4 overflow-hidden"
        >
            <div className="relative flex flex-col items-center max-w-xl w-full">
                {/* Logo Text */}
                <div
                    ref={logoRef}
                    className="text-white text-2xl sm:text-3xl font-bold tracking-[0.3em] mb-8 text-center"
                >
                    LIN&apos;S INFOTECH
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mb-4">
                    <div
                        ref={progressRef}
                        className="absolute top-0 left-0 h-full bg-[#E3000F] w-0"
                    />
                </div>

                {/* Counter */}
                <div
                    ref={counterRef}
                    className="text-white/50 font-mono text-sm tracking-widest"
                >
                    {counter}%
                </div>
            </div>
        </div>
    );
};

export default Preloader;
