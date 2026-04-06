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
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Image */}
                <div
                    ref={imageRef}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--card)]"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                        alt="Lin - Founder"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
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
                        Lin — Founder & CEO
                    </h2>
                    <p className="text-[var(--muted)] text-lg leading-relaxed mb-10">
                        Lin founded Lin&apos;s InfoTech with a vision to make AI-powered solutions accessible to modern businesses. With deep expertise in AI development, automation, and digital transformation, Lin leads a team dedicated to building intelligent systems that drive real results.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                        {['AI Expert', 'Full Stack', 'Startup Mentor'].map(chip => (
                            <span key={chip} className="px-5 py-2 rounded-full border border-[var(--border)] text-[var(--muted)] text-sm font-bold">
                                {chip}
                            </span>
                        ))}
                    </div>

                    <button className="group flex items-center space-x-3 text-[var(--foreground)] font-bold text-lg tracking-tight">
                        <span>Let&apos;s Connect</span>
                        <span className="text-[var(--accent)] transition-transform group-hover:translate-x-2">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;
