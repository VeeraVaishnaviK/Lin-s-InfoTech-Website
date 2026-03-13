'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'AI', 'Web', 'Mobile', 'Automation'];

const PROJECTS = [
    { id: 1, title: 'IntelliHealth Platform', category: 'AI', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Nexus E-Commerce', category: 'Web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Zenith CRM App', category: 'Mobile', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'SupplyChain Auto', category: 'Automation', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
    { id: 5, title: 'Predictive Trader', category: 'AI', image: 'https://images.unsplash.com/photo-1611974717483-360061fc5f61?q=80&w=800&auto=format&fit=crop' },
    { id: 6, title: 'Vanguard Portfolio', category: 'Web', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' },
];

const Portfolio: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const filteredProjects = PROJECTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial entrance animation for cards
        cardsRef.current.forEach((card, idx) => {
            if (!card) return;
            gsap.fromTo(card,
                { clipPath: "inset(100% 0 0 0)", opacity: 0, y: 30 },
                {
                    clipPath: "inset(0% 0 0 0)",
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [activeCategory]); // Re-run when filter changes to catch new cards

    return (
        <section className="py-24 bg-[#0A0A0A] px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            Our <span className="text-[#E3000F]">Work</span>
                        </h2>
                        <p className="text-white/50 max-w-md">
                            A selection of our most impactful AI solutions and digital products delivered to global clients.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full border text-sm font-bold transition-all duration-300",
                                    activeCategory === cat
                                        ? "bg-[#E3000F] border-[#E3000F] text-white shadow-[0_0_20px_rgba(227,0,15,0.3)]"
                                        : "border-[#1F1F1F] text-white/40 hover:border-[#888] hover:text-white"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            ref={el => { cardsRef.current[idx] = el; }}
                            data-cursor="view"
                            className="group relative aspect-[4/5] bg-[#111111] rounded-2xl overflow-hidden cursor-none"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-xs font-bold text-[#E3000F] uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    {project.category}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                    {project.title}
                                </h3>
                                <div className="text-white font-bold inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                                    View Project <span className="text-[#E3000F]">→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
