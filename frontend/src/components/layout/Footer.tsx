'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const Footer: React.FC = () => {
    const footerTextRef = useRef<HTMLDivElement>(null);
    const linkedinRef = useRef<HTMLAnchorElement>(null);

    // Magnetic effect for social icons
    useEffect(() => {
        const ctx = gsap.context(() => {
            const createMagnetic = (target: HTMLAnchorElement | null) => {
                if (!target) return;

                const xTo = gsap.quickTo(target, "x", { duration: 0.3, ease: "power3" });
                const yTo = gsap.quickTo(target, "y", { duration: 0.3, ease: "power3" });

                const onMove = (e: MouseEvent) => {
                    const { clientX, clientY } = e;
                    const { left, top, width, height } = target.getBoundingClientRect();
                    const x = clientX - (left + width / 2);
                    const y = clientY - (top + height / 2);
                    xTo(x * 0.5);
                    yTo(y * 0.5);
                };

                const onLeave = () => {
                    xTo(0);
                    yTo(0);
                };

                target.addEventListener("mousemove", onMove);
                target.addEventListener("mouseleave", onLeave);
            };

            createMagnetic(linkedinRef.current);
        });

        return () => ctx.revert();
    }, []);

    return (
        <footer className="relative bg-[var(--background)] pt-20 pb-10 overflow-hidden">
            {/* Scrolling Marquee */}
            <div className="w-full border-t border-b border-[var(--border)] py-4 mb-20 overflow-hidden group">
                <div className="flex whitespace-nowrap animate-marquee group-hover:pause">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex items-center">
                            <span className="text-[var(--foreground)] text-sm uppercase tracking-widest px-8">AI Development</span>
                            <span className="text-[var(--accent)]">•</span>
                            <span className="text-[var(--foreground)] text-sm uppercase tracking-widest px-8">Web Development</span>
                            <span className="text-[var(--accent)]">•</span>
                            <span className="text-[var(--foreground)] text-sm uppercase tracking-widest px-8">Mobile Apps</span>
                            <span className="text-[var(--accent)]">•</span>
                            <span className="text-[var(--foreground)] text-sm uppercase tracking-widest px-8">Automation</span>
                            <span className="text-[var(--accent)]">•</span>
                            <span className="text-[var(--foreground)] text-sm uppercase tracking-widest px-8">AI Solutions</span>
                            <span className="text-[var(--accent)]">•</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logo Emblem */}
            <div className="container mx-auto px-6 flex justify-center items-center py-8 select-none pointer-events-none">
                {/* Light Theme Logo (Dark text/logo) */}
                <img
                    src="/logo-dark.png"
                    alt="Lin's InfoTech Logo"
                    className="w-[320px] md:w-[480px] h-auto opacity-20 block dark:hidden transition-all duration-500"
                />
                {/* Dark Theme Logo (White text/logo) */}
                <img
                    src="/logo-white.png"
                    alt="Lin's InfoTech Logo"
                    className="w-[320px] md:w-[480px] h-auto opacity-20 hidden dark:block transition-all duration-500"
                />
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto px-6 mt-20 flex flex-col md:flex-row items-center justify-between border-t border-[var(--border)] pt-10 gap-8">
                <div className="text-[var(--muted)] text-sm">
                    © {new Date().getFullYear()} Lin&apos;s InfoTech. All rights reserved.
                </div>

                <div className="flex items-center space-x-6">
                    <Link 
                        href="https://www.linkedin.com/company/lin-s-infotech/posts/?feedView=all" 
                        ref={linkedinRef}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                    >
                        <Linkedin size={24} />
                    </Link>
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
          width: 200%;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
