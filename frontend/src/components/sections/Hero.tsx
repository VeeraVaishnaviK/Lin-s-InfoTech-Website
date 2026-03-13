'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { MousePointer2 } from 'lucide-react';

const Hero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Canvas Dot Grid logic
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const dots: { x: number; y: number; originalOpacity: number; currentOpacity: number }[] = [];
        const spacing = 30;

        const initDots = () => {
            dots.length = 0;
            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    dots.push({ x, y, originalOpacity: 0.15, currentOpacity: 0.15 });
                }
            }
        };

        initDots();

        let mouse = { x: -1000, y: -1000 };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initDots();
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        const render = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            dots.forEach(dot => {
                const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
                const breathe = Math.sin(time / 1000) * 0.05;

                if (dist < 120) {
                    dot.currentOpacity = gsap.utils.interpolate(dot.currentOpacity, 0.8, 0.1);
                    ctx.fillStyle = `rgba(227, 0, 15, ${dot.currentOpacity})`;
                } else {
                    dot.currentOpacity = gsap.utils.interpolate(dot.currentOpacity, dot.originalOpacity + breathe, 0.05);
                    ctx.fillStyle = `rgba(31, 31, 31, ${dot.currentOpacity})`;
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        // Headline Animation
        const words = headlineRef.current?.querySelectorAll('.word');
        if (words) {
            gsap.from(words, {
                y: 100,
                opacity: 0,
                stagger: 0.08,
                duration: 0.9,
                ease: 'power4.out',
                delay: 0.5
            });
        }

        gsap.from(subtextRef.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 1.2
        });

        gsap.from(ctaRef.current, {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 1.5
        });

        // Orb drift
        gsap.to(orbRef.current, {
            x: 'random(-50, 50)',
            y: 'random(-50, 50)',
            duration: 'random(5, 8)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const headlineLines = [
        "Building Intelligent",
        "AI Solutions",
        "for Modern Businesses"
    ];

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0A] px-6">
            {/* Interactive Dot Grid Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0"
            />

            {/* Blurred Red Orb */}
            <div
                ref={orbRef}
                className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#E3000F] rounded-full filter blur-[140px] opacity-[0.08] z-0 pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
                {/* Eyebrow */}
                <div className="px-4 py-1 border border-[#E3000F] rounded-full text-[#E3000F] text-xs font-bold uppercase tracking-widest mb-8">
                    AI-Powered Technology Agency
                </div>

                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#F5F5F5] leading-[0.9] tracking-tighter mb-8 overflow-hidden"
                >
                    {headlineLines.map((line, idx) => (
                        <div key={idx} className="block overflow-hidden pb-2">
                            {line.split(' ').map((word, wIdx) => (
                                <span key={wIdx} className="inline-block word mr-[0.2em]">
                                    {word === "AI" || word === "Solutions" ? (
                                        <span className="bg-gradient-to-r from-[#E3000F] to-[#FF2D3A] bg-clip-text text-transparent">
                                            {word}
                                        </span>
                                    ) : word}
                                </span>
                            ))}
                        </div>
                    ))}
                </h1>

                {/* Subtext */}
                <p
                    ref={subtextRef}
                    className="text-white/50 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed"
                >
                    Lin&apos;s InfoTech delivers cutting-edge AI development, automation, and digital solutions that transform how businesses operate in the modern age.
                </p>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="px-8 py-4 bg-[#E3000F] text-white rounded-lg font-bold transition-all hover:bg-[#FF2D3A] hover:shadow-[0_0_30px_rgba(227,0,15,0.4)] flex items-center gap-3 group">
                        Start Your Project
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-[#1F1F1F] text-white rounded-lg font-bold transition-all hover:border-[#E3000F]">
                        View Our Work
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 animate-bounce">
                <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
                <span className="text-[10px] uppercase tracking-widest mt-2">Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
