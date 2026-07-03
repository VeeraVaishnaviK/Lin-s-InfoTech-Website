'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    Cpu,
    Code2,
    Smartphone,
    Settings2,
    MessageSquare,
    BarChart3,
    ChevronDown,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICES_DETAIL = [
    {
        id: 'ai',
        title: 'AI Development',
        icon: <Cpu size={40} />,
        description: 'Custom machine learning models and neural networks tailored to your business logic and data patterns.',
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'FastAPI'],
        process: ['Data Collection', 'Model Design', 'Training & Validation', 'API Integration'],
        pricing: 'Starting at $5,000'
    },
    {
        id: 'web',
        title: 'Web Development',
        icon: <Code2 size={40} />,
        description: 'Scalable, high-performance web applications built with Next.js, React, and cutting-edge frontend tech.',
        techStack: ['Next.js', 'React', 'TailwindCSS', 'Node.js', 'Typescript'],
        process: ['UI/UX Design', 'Frontend Dev', 'Backend Architecture', 'Deployment'],
        pricing: 'Starting at $3,500'
    },
    {
        id: 'mobile',
        title: 'Mobile Apps',
        icon: <Smartphone size={40} />,
        description: 'Native and cross-platform mobile solutions that provide seamless user experiences on iOS and Android.',
        techStack: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)'],
        process: ['Prototyping', 'Environment Setup', 'App Development', 'Store Submission'],
        pricing: 'Starting at $6,000'
    },
    {
        id: 'automation',
        title: 'Automation Systems',
        icon: <Settings2 size={40} />,
        description: 'Streamline your workflows with intelligent RPA and custom automated pipelines to maximize efficiency.',
        techStack: ['Zapier', 'Make.com', 'n8n', 'Python', 'Selenium'],
        process: ['Workflow Audit', 'Logic Mapping', 'Bot Development', 'Monitoring'],
        pricing: 'Starting at $2,500'
    },
    {
        id: 'chatbots',
        title: 'AI Chatbots',
        icon: <MessageSquare size={40} />,
        description: 'Advanced NLP-driven conversational agents that handle customer support and sales 24/7.',
        techStack: ['OpenAI API', 'LangChain', 'Pinecone', 'Voiceflow', 'Botpress'],
        process: ['Knowledge Base', 'Prompt Engineering', 'Platform Embed', 'Tuning'],
        pricing: 'Starting at $4,000'
    },
    {
        id: 'analytics',
        title: 'Data Analytics',
        icon: <BarChart3 size={40} />,
        description: 'Turn your raw data into actionable insights with our deep learning and predictive analytics tools.',
        techStack: ['PowerBI', 'Tableau', 'Pandas', 'Spark', 'SQL'],
        process: ['Data Cleaning', 'Pattern Recognition', 'Visualization', 'Reporting'],
        pricing: 'Starting at $4,500'
    },
];

const ServicesContent = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const serviceId = searchParams.get('service');
        if (serviceId) {
            const exists = SERVICES_DETAIL.some(s => s.id === serviceId);
            if (exists) {
                setExpandedId(serviceId);
                setTimeout(() => {
                    const el = document.getElementById(`service-${serviceId}`);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 400);
            }
        }
    }, [searchParams]);

    return (
        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            {SERVICES_DETAIL.map((service) => (
                <div
                    key={service.id}
                    id={`service-${service.id}`}
                    className={cn(
                        "bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-500 scroll-mt-24",
                        expandedId === service.id ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/20" : "hover:border-[var(--muted)]"
                    )}
                >
                    <button
                        onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                        className="w-full p-8 flex flex-col md:flex-row items-center text-left gap-8"
                    >
                        <div className="h-16 w-16 bg-[var(--border)] text-[var(--accent)] rounded-xl flex items-center justify-center shrink-0">
                            {service.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{service.title}</h3>
                            <p className="text-[var(--muted)]">{service.description}</p>
                        </div>
                        <div className={cn(
                            "p-2 rounded-full border border-[var(--border)] transition-transform duration-500",
                            expandedId === service.id ? "rotate-180 bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]" : "text-[var(--muted)]"
                        )}>
                            <ChevronDown size={24} />
                        </div>
                    </button>

                    <div className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out",
                        expandedId === service.id ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        <div className="px-8 pb-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[var(--border)] mt-4">
                            {/* Tech Stack */}
                            <div>
                                <h4 className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-4">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {service.techStack.map(stack => (
                                        <span key={stack} className="px-3 py-1 bg-[var(--border)] text-[var(--foreground)]/80 text-xs rounded-md font-medium">{stack}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Process */}
                            <div>
                                <h4 className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-4">Process</h4>
                                <ul className="space-y-2">
                                    {service.process.map(step => (
                                        <li key={step} className="flex items-center space-x-2 text-[var(--muted)] text-sm">
                                            <CheckCircle2 size={14} className="text-[var(--accent)]" />
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pricing & CTA */}
                            <div className="bg-[var(--border)]/30 p-6 rounded-xl border border-[var(--border)]">
                                <h4 className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest mb-2">Estimate</h4>
                                <div className="text-2xl font-black text-[var(--foreground)] mb-6 uppercase tracking-tighter">
                                    {service.pricing}
                                </div>
                                <Link href={`/get-started?service=${service.id}`} className="w-full block text-center py-3 bg-[var(--accent)] text-[var(--background)] rounded-lg font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                                    Start Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ServicesPage = () => {
    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                        Our <span className="text-[var(--accent)]">Services</span>
                    </h1>
                    <p className="text-[var(--muted)] text-xl max-w-2xl mx-auto">
                        Comprehensive AI and digital solutions designed to scale your business and automate your future.
                    </p>
                </div>

                <Suspense fallback={<div className="text-center py-12 text-[var(--muted)] uppercase tracking-widest">Loading services...</div>}>
                    <ServicesContent />
                </Suspense>

                <div className="mt-24 text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-[var(--foreground)]">Ready to Build Your Intelligence?</h2>
                    <Link href="/contact" className="inline-block px-10 py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full font-black text-xl uppercase tracking-tighter hover:bg-[var(--accent)] hover:text-white transition-all">
                        Book a Free Consultation
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
