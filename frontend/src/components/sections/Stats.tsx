'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const STATS = [
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 30, suffix: '+', label: 'Happy Clients' },
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

const Stats: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
            STATS.forEach((_, i) => {
                const target = { val: 0 };
                const element = document.getElementById(`stat-count-${i}`);

                if (element) {
                    gsap.to(target, {
                        val: STATS[i].value,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                        },
                        onUpdate: () => {
                            element.innerText = Math.floor(target.val).toString();
                        },
                    });
                }
            });
        }, containerRef);

        return () => context.revert();
    }, []);

    return (
        <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E3000F]/30 to-transparent -translate-y-1/2" />

            <div
                ref={containerRef}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="flex items-baseline text-5xl md:text-7xl font-black text-[#E3000F] mb-2 tracking-tighter">
                                <span id={`stat-count-${idx}`}>0</span>
                                <span>{stat.suffix}</span>
                            </div>
                            <div className="text-[#888] font-bold uppercase tracking-widest text-xs md:text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
