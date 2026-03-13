'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    Cpu,
    Code2,
    Smartphone,
    Settings2,
    MessageSquare,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
    {
        title: 'AI Development',
        description: 'Custom machine learning models and neural networks tailored to your business logic and data patterns.',
        icon: <Cpu size={40} className="text-[#E3000F]" />,
        href: '/services/ai-development'
    },
    {
        title: 'Web Development',
        description: 'Scalable, high-performance web applications built with Next.js, React, and cutting-edge frontend tech.',
        icon: <Code2 size={40} className="text-[#E3000F]" />,
        href: '/services/web-development'
    },
    {
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile solutions that provide seamless user experiences on iOS and Android.',
        icon: <Smartphone size={40} className="text-[#E3000F]" />,
        href: '/services/mobile-apps'
    },
    {
        title: 'Automation Systems',
        description: 'Streamline your workflows with intelligent RPA and custom automated pipelines to maximize efficiency.',
        icon: <Settings2 size={40} className="text-[#E3000F]" />,
        href: '/services/automation'
    },
    {
        title: 'AI Chatbots',
        description: 'Advanced NLP-driven conversational agents that handle customer support and sales 24/7.',
        icon: <MessageSquare size={40} className="text-[#E3000F]" />,
        href: '/services/chatbots'
    },
    {
        title: 'Data Analytics',
        description: 'Turn your raw data into actionable insights with our deep learning and predictive analytics tools.',
        icon: <BarChart3 size={40} className="text-[#E3000F]" />,
        href: '/services/analytics'
    },
];

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section || !cardsRef.current) return;

        const cards = cardsRef.current;
        const totalWidth = cards.scrollWidth - window.innerWidth + 100; // Extra padding

        const scrollTween = gsap.to(cards, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${totalWidth}`,
                onUpdate: (self) => {
                    if (progressRef.current) {
                        gsap.set(progressRef.current, { scaleX: self.progress });
                    }
                },
            }
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0A]"
        >
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                    What We <span className="text-[#E3000F]">Build</span>
                </h2>
            </div>

            <div className="flex items-center">
                <div
                    ref={cardsRef}
                    className="flex space-x-8 px-6 md:px-20"
                >
                    {SERVICES.map((service, idx) => (
                        <div
                            key={idx}
                            className="group relative w-[320px] md:w-[380px] shrink-0 aspect-[4/5] bg-[#111111]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#E3000F] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(227,0,15,0.1)]"
                        >
                            <div>
                                <div className="mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500 origin-left">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                                <p className="text-white/50 leading-relaxed text-sm md:text-base">
                                    {service.description}
                                </p>
                            </div>

                            <Link
                                href={service.href}
                                className="group/link flex items-center space-x-2 text-[#E3000F] font-bold text-sm tracking-widest uppercase"
                            >
                                <span>Learn more</span>
                                <span className="transition-transform group-hover/link:translate-x-1">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-10 left-6 md:left-20 right-6 md:right-20 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full bg-[#E3000F] w-full origin-left scale-x-0"
                />
            </div>
        </section>
    );
};

export default Services;
