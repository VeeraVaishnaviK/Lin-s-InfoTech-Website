'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const CTA: React.FC = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            const dist = Math.hypot(x, y);

            if (dist < 100) {
                xTo(x * 0.4);
                yTo(y * 0.4);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        const onMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            btn.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-[#0A0A0A] overflow-hidden border-t border-[#1F1F1F]"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#E3000F]/10 to-transparent pointer-events-none" />

            {/* Animated Noise / Particles could go here */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                    Ready to Build <br />
                    <span className="text-[#E3000F]">Something Intelligent?</span>
                </h2>

                <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-16">
                    Let&apos;s turn your idea into an AI-powered product that scales. Our experts are ready to help.
                </p>

                <div className="flex justify-center">
                    <button
                        ref={buttonRef}
                        className="px-12 py-6 bg-[#E3000F] text-white rounded-2xl font-black text-xl md:text-2xl uppercase tracking-tighter transition-all hover:bg-[#FF2D3A] hover:shadow-[0_0_50px_rgba(227,0,15,0.5)]"
                    >
                        Start Your Project
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
