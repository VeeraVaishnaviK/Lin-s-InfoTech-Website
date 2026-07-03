'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { clipPath: "inset(0 100% 0 0)" },
                    {
                        clipPath: "inset(0 0% 0 0)",
                        duration: 1.5,
                        ease: "power4.inOut",
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }

            if (headlineRef.current) {
                const words = headlineRef.current.innerText.split(' ');
                headlineRef.current.innerHTML = words.map(w => `<span class="inline-block opacity-0 translate-y-full">${w}</span>`).join(' ');

                gsap.to(headlineRef.current.querySelectorAll('span'), {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headlineRef.current,
                        start: "top 85%",
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-[var(--background)] px-6 overflow-hidden">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left: Image */}
                <div className="flex justify-center lg:justify-center w-full">
                    <div
                        ref={imageRef}
                        className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-[var(--card)]"
                    >
                        <Image
                            src="/rejolin-original.png"
                            alt="Rejolin Solomon J - Founder"
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>

                {/* Right: Content */}
                <div>
                    <div className="text-[var(--accent)] font-bold text-sm uppercase tracking-widest mb-4">
                        Meet the Founder
                    </div>
                    <h2
                        ref={headlineRef}
                        className="text-4xl md:text-6xl font-black text-[var(--foreground)] uppercase tracking-tighter mb-8 leading-none"
                    >
                        Rejolin Solomon J — Founder & CEO
                    </h2>
                    <p className="text-[var(--muted)] text-lg leading-relaxed mb-10">
                        Rejolin Solomon J is the Founder and CEO of Lin&apos;s InfoTech. A visionary software engineer and developer community leader, Rejolin also serves as the President of the Google Developer Groups (GDG) on Campus at SIMATS, student convenor for the Institution&apos;s Innovation Council (IIC), and an Intel AI Student Community Ambassador. Under his leadership, Lin&apos;s InfoTech builds premium, cutting-edge web, mobile, and AI automation solutions that transform business operations with visual excellence.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                        {['Founder & CEO', 'GDG Campus Lead', 'Intel AI Ambassador', 'Startup Strategist'].map(chip => (
                            <span key={chip} className="px-5 py-2 rounded-full border border-[var(--border)] text-[var(--muted)] text-sm font-bold">
                                {chip}
                            </span>
                        ))}
                    </div>

                    <a
                        href="https://www.linkedin.com/in/rejolin-solomon-j"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center space-x-3 text-[var(--foreground)] font-bold text-lg tracking-tight hover:text-[var(--accent)] transition-colors cursor-pointer"
                    >
                        <span>Let&apos;s Connect</span>
                        <span className="text-[var(--accent)] transition-transform group-hover:translate-x-2">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
