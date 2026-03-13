'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const Footer: React.FC = () => {
    const footerTextRef = useRef<HTMLDivElement>(null);

    // Magnetic effect for social icons
    const createMagnetic = (target: HTMLAnchorElement | null) => {
        if (!target) return;

        const xTo = gsap.quickTo(target, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(target, "y", { duration: 0.3, ease: "power3" });

        target.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = target.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.5);
            yTo(y * 0.5);
        });

        target.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
        });
    };

    const githubRef = useRef<HTMLAnchorElement>(null);
    const linkedinRef = useRef<HTMLAnchorElement>(null);
    const twitterRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        createMagnetic(githubRef.current);
        createMagnetic(linkedinRef.current);
        createMagnetic(twitterRef.current);
    }, []);

    return (
        <footer className="relative bg-[#0A0A0A] pt-20 pb-10 overflow-hidden">
            {/* Scrolling Marquee */}
            <div className="w-full border-t border-b border-[#1F1F1F] py-4 mb-20 overflow-hidden group">
                <div className="flex whitespace-nowrap animate-marquee group-hover:pause">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex items-center">
                            <span className="text-[#F5F5F5] text-sm uppercase tracking-widest px-8">AI Development</span>
                            <span className="text-[#E3000F]">•</span>
                            <span className="text-[#F5F5F5] text-sm uppercase tracking-widest px-8">Web Development</span>
                            <span className="text-[#E3000F]">•</span>
                            <span className="text-[#F5F5F5] text-sm uppercase tracking-widest px-8">Mobile Apps</span>
                            <span className="text-[#E3000F]">•</span>
                            <span className="text-[#F5F5F5] text-sm uppercase tracking-widest px-8">Automation</span>
                            <span className="text-[#E3000F]">•</span>
                            <span className="text-[#F5F5F5] text-sm uppercase tracking-widest px-8">AI Solutions</span>
                            <span className="text-[#E3000F]">•</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Giant Outline Text */}
            <div className="container mx-auto px-6 text-center select-none pointer-events-none">
                <h2
                    className="text-[clamp(4rem,15vw,12rem)] font-black uppercase leading-none opacity-20"
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '1px #1F1F1F'
                    }}
                >
                    LIN&apos;S INFOTECH
                </h2>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto px-6 mt-20 flex flex-col md:flex-row items-center justify-between border-t border-[#1F1F1F] pt-10 gap-8">
                <div className="text-white/40 text-sm">
                    © {new Date().getFullYear()} Lin&apos;s InfoTech. All rights reserved.
                </div>

                <div className="flex items-center space-x-6">
                    <Link href="https://github.com" ref={githubRef} className="p-3 text-white/60 hover:text-white transition-colors">
                        <Github size={24} />
                    </Link>
                    <Link href="https://linkedin.com" ref={linkedinRef} className="p-3 text-white/60 hover:text-white transition-colors">
                        <Linkedin size={24} />
                    </Link>
                    <Link href="https://twitter.com" ref={twitterRef} className="p-3 text-white/60 hover:text-white transition-colors">
                        <Twitter size={24} />
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
