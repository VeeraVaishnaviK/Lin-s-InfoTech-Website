'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

const CTA: React.FC = () => {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        const ctx = gsap.context(() => {
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

            // Return cleanup for the context specifically (optional but good for consistency)
            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                btn.removeEventListener('mouseleave', onMouseLeave);
            };
        });

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-[var(--background)] overflow-hidden border-t border-[var(--border)]"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 to-transparent pointer-events-none" />

            {/* Animated Noise / Particles could go here */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-5xl md:text-8xl font-black text-[var(--foreground)] uppercase tracking-tighter mb-8 leading-[0.9]">
                    Ready to Build <br />
                    <span className="text-[var(--accent)]">Something Intelligent?</span>
                </h2>

                <p className="text-[var(--muted)] text-lg md:text-xl max-w-xl mx-auto mb-16">
                    Let&apos;s turn your idea into an AI-powered product that scales. Our experts are ready to help.
                </p>

                <div className="flex justify-center">
                    <Link
                        href="/ai-tools"
                        ref={buttonRef}
                        className="px-12 py-6 bg-[var(--accent)] text-white rounded-2xl font-black text-xl md:text-2xl uppercase tracking-tighter transition-all hover:bg-[var(--accent)]/90 hover:shadow-[0_0_50px_rgba(227,0,15,0.5)]"
                    >
                        Start Your Project
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
