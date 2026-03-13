'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Shield, Rocket, Zap, Eye } from 'lucide-react';
import AboutFounder from '@/components/sections/About'; // Reuse homepage section

const AboutPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Split text reveal for Hero
        const words = heroRef.current?.innerText.split(' ') || [];
        if (heroRef.current) {
            heroRef.current.innerHTML = words.map(w => `<span class="inline-block opacity-0 translate-y-full">${w}</span>`).join(' ');
            gsap.to(heroRef.current.querySelectorAll('span'), {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "expo.out"
            });
        }
    }, []);

    return (
        <div className="bg-[#0A0A0A] text-white">
            {/* Hero Section */}
            <section className="min-h-[60vh] flex items-center justify-center pt-20">
                <div className="container mx-auto px-6 text-center">
                    <h1
                        ref={heroRef}
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8"
                    >
                        About Lin&apos;s <span className="text-[#E3000F]">InfoTech</span>
                    </h1>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto">
                        We are a collective of AI researchers, developers, and designers dedicated to pushing the boundaries of what&apos;s possible with technology.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-6 border-y border-[#1F1F1F]">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold uppercase tracking-tighter">Our Mission</h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                            At Lin&apos;s InfoTech, our mission is to empower businesses by integrating cutting-edge AI and automation into their core operations. We believe that technology should not just be a tool, but a strategic partner in growth.
                        </p>
                        <div className="h-2 w-24 bg-[#E3000F]" />
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#111111] border border-[#1F1F1F]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E3000F]/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold tracking-widest opacity-20">INNOVATION HUB</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-6 bg-[#0A0A0A]">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter mb-16 text-center">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Zap />, title: 'Innovation', desc: 'Always pushing for the next breakthrough.' },
                            { icon: <Shield />, title: 'Quality', desc: 'Precision-engineered solutions that last.' },
                            { icon: <Rocket />, title: 'Speed', desc: 'Rapid delivery without compromising excellence.' },
                            { icon: <Eye />, title: 'Transparency', desc: 'Clear communication and honest results.' },
                        ].map((value, i) => (
                            <div key={i} className="p-8 bg-[#111111] border border-[#1F1F1F] rounded-2xl hover:border-[#E3000F] transition-all group">
                                <div className="text-[#E3000F] mb-6 transform transition-transform group-hover:scale-110">{value.icon}</div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Homepage About Section (Reused for Founder) */}
            <AboutFounder />

            {/* Timeline Section */}
            <section className="py-24 px-6 border-t border-[#1F1F1F]">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter mb-20 text-center">Our Journey</h2>
                    <div className="relative space-y-12 after:absolute after:inset-0 after:ml-5 after:-z-10 after:h-full after:w-0.5 after:-translate-x-px after:bg-gradient-to-b after:from-[#E3000F] after:via-[#1F1F1F] after:to-transparent">
                        {[
                            { year: '2022', title: 'Founding', desc: 'Lin founded the agency with a focus on AI automation.' },
                            { year: '2023', title: 'Global Launch', desc: 'Expanded services to clients across 15 countries.' },
                            { year: '2024', title: 'AI Hub Launch', desc: 'Released our proprietary AI requirement analyzer.' },
                            { year: '2025', title: 'The Future', desc: 'Continuing to build the intelligent web.' },
                        ].map((item, i) => (
                            <div key={i} className="relative flex items-center justify-between group">
                                <div className="flex items-center w-full">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] border border-[#E3000F] text-[#E3000F] font-bold z-10 group-hover:bg-[#E3000F] group-hover:text-white transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="ml-10 p-6 bg-[#111111] border border-[#1F1F1F] rounded-2xl w-full group-hover:border-[#E3000F]/50 transition-all">
                                        <span className="text-[#E3000F] font-bold text-lg">{item.year}</span>
                                        <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                                        <p className="text-white/50 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
