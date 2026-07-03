'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'AI', 'Web', 'Mobile'];

const PROJECTS = [
    {
        id: 1,
        title: 'Laundex',
        description: 'Premium on-demand laundry and dry cleaning application with real-time tracking, scheduling, and door-to-door delivery logistics.',
        category: 'Mobile',
        image: '/portfolio-laundex.png',
        tech: ['React Native', 'Next.js', 'TailwindCSS'],
        link: 'https://www.laundex.in/'
    },
    {
        id: 2,
        title: 'Apex Engineering',
        description: 'Industrial fabrication and custom engineering platform displaying heavy structural designs and manufacturing capabilities.',
        category: 'Web',
        image: '/portfolio-apex.png',
        tech: ['Next.js', 'Framer Motion', 'TailwindCSS'],
        link: 'https://www.apexengineering.org.in/'
    },
    {
        id: 3,
        title: 'Nexacro AI',
        description: 'Computer vision machine learning model engineered to detect and analyze acrosome defect classifications in sperm diagnostics.',
        category: 'AI',
        image: '/portfolio-nexacro.png',
        tech: ['Python', 'TensorFlow', 'FastAPI', 'OpenCV'],
        link: 'https://www.nexacro.in/'
    },
    {
        id: 4,
        title: 'Scholar Link Up',
        description: 'Interactive peer-to-peer tutoring and teaching platform connecting expert educators and students for remote study.',
        category: 'Web',
        image: '/portfolio-scholar.png',
        tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        link: 'https://scholar-link-up.vercel.app/'
    }
];

const Portfolio: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const filteredProjects = PROJECTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Initial entrance animation for cards
            cardsRef.current.forEach((card, idx) => {
                if (!card) return;
                gsap.fromTo(card,
                    { scale: 0.95, opacity: 0, y: 30 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 1.0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <section ref={containerRef} className="py-24 bg-[var(--background)] px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] uppercase tracking-tighter mb-4">
                            Our <span className="text-[var(--accent)]">Work</span>
                        </h2>
                        <p className="text-[var(--muted)] max-w-md">
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
                                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-[0_0_20px_rgba(227,0,15,0.3)]"
                                        : "border-[var(--border)] text-[var(--muted)] hover:border-[#888] hover:text-[var(--foreground)]"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {filteredProjects.map((project, idx) => (
                        <a
                            key={project.id}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={el => { cardsRef.current[idx] = el; }}
                            className="group block bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden hover:border-[var(--accent)]/30 hover:shadow-[0_20px_50px_rgba(227,0,15,0.05)] transition-all duration-500 flex flex-col h-[520px]"
                        >
                            {/* Media Box */}
                            <div className="relative w-full h-[300px] bg-[var(--border)]/10 p-6 flex items-center justify-center overflow-hidden border-b border-[var(--border)]">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-[var(--border)]">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content Box */}
                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex gap-2 mb-4">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-[9px] font-bold uppercase tracking-widest bg-[var(--border)] text-[var(--foreground)]/80 px-2.5 py-1 rounded-md">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors uppercase tracking-tight">{project.title}</h3>
                                    <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex items-center text-[var(--accent)] font-bold text-xs uppercase tracking-widest gap-2 mt-4">
                                    Launch Project <span>→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
