'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'AI', 'Web', 'Mobile', 'Automation'];

const PROJECTS = [
    { id: 1, title: 'IntelliHealth Platform', category: 'AI', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop', tech: ['Gemini API', 'Next.js', 'FastAPI'] },
    { id: 2, title: 'Nexus E-Commerce', category: 'Web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', tech: ['Next.js', 'Stripe', 'Node.js'] },
    { id: 3, title: 'Zenith CRM App', category: 'Mobile', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop', tech: ['React Native', 'Firebase'] },
    { id: 4, title: 'SupplyChain Auto', category: 'Automation', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', tech: ['Python', 'n8n', 'Zapier'] },
    { id: 5, title: 'Predictive Trader', category: 'AI', image: 'https://images.unsplash.com/photo-1611974717483-360061fc5f61?q=80&w=800&auto=format&fit=crop', tech: ['TensorFlow', 'Python'] },
    { id: 6, title: 'Vanguard Portfolio', category: 'Web', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop', tech: ['React', 'GSAP', 'Tailwind'] },
];

const PortfolioPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const filteredProjects = PROJECTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Grid entry animation
        cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.fromTo(card,
                { scale: 0.9, opacity: 0, y: 30 },
                {
                    scale: 1, opacity: 1, y: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }, [activeCategory]);

    return (
        <div className="bg-[#0A0A0A] text-white pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                            Our <span className="text-[#E3000F]">Portfolio</span>
                        </h1>
                        <p className="text-white/50 text-xl">
                            A showroom of intelligent systems and high-end digital experiences we&apos;ve built for our clients.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-8 py-3 rounded-full border text-sm font-bold uppercase tracking-widest transition-all duration-300",
                                    activeCategory === cat
                                        ? "bg-[#E3000F] border-[#E3000F] text-white shadow-[0_0_30px_rgba(227,0,15,0.4)]"
                                        : "border-[#1F1F1F] text-white/40 hover:border-[#888] hover:text-white"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            ref={el => { cardsRef.current[idx] = el; }}
                            data-cursor="view"
                            className="group relative h-[500px] rounded-3xl overflow-hidden bg-[#111111] animate-in"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 w-full p-8 transition-all duration-500 group-hover:translate-y-[-10px]">
                                <div className="flex gap-2 mb-4">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-2 py-1 rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{project.title}</h3>
                                <div className="flex items-center text-[#E3000F] font-bold text-sm tracking-widest uppercase gap-2 transition-all group-hover:gap-4">
                                    View Case Study <span>→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
