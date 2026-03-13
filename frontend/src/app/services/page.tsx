'use client';

import React, { useState } from 'react';
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

const ServicesPage = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="bg-[#0A0A0A] text-white pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                        Our <span className="text-[#E3000F]">Services</span>
                    </h1>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto">
                        Comprehensive AI and digital solutions designed to scale your business and automate your future.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                    {SERVICES_DETAIL.map((service) => (
                        <div
                            key={service.id}
                            className={cn(
                                "bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden transition-all duration-500",
                                expandedId === service.id ? "border-[#E3000F] ring-1 ring-[#E3000F]/20" : "hover:border-[#333]"
                            )}
                        >
                            <button
                                onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                                className="w-full p-8 flex flex-col md:flex-row items-center text-left gap-8"
                            >
                                <div className="h-16 w-16 bg-[#1F1F1F] text-[#E3000F] rounded-xl flex items-center justify-center shrink-0">
                                    {service.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{service.title}</h3>
                                    <p className="text-white/50">{service.description}</p>
                                </div>
                                <div className={cn(
                                    "p-2 rounded-full border border-[#1F1F1F] transition-transform duration-500",
                                    expandedId === service.id ? "rotate-180 bg-[#E3000F] text-white border-[#E3000F]" : "text-white/30"
                                )}>
                                    <ChevronDown size={24} />
                                </div>
                            </button>

                            <div className={cn(
                                "overflow-hidden transition-all duration-500 ease-in-out",
                                expandedId === service.id ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="px-8 pb-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#1F1F1F]/50 mt-4">
                                    {/* Tech Stack */}
                                    <div>
                                        <h4 className="text-[#E3000F] text-xs font-bold uppercase tracking-widest mb-4">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {service.techStack.map(stack => (
                                                <span key={stack} className="px-3 py-1 bg-[#1F1F1F] text-white/80 text-xs rounded-md font-medium">{stack}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Process */}
                                    <div>
                                        <h4 className="text-[#E3000F] text-xs font-bold uppercase tracking-widest mb-4">Process</h4>
                                        <ul className="space-y-2">
                                            {service.process.map(step => (
                                                <li key={step} className="flex items-center space-x-2 text-white/60 text-sm">
                                                    <CheckCircle2 size={14} className="text-[#E3000F]" />
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Pricing & CTA */}
                                    <div className="bg-[#1F1F1F]/30 p-6 rounded-xl border border-[#1F1F1F]">
                                        <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Estimate</h4>
                                        <div className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
                                            {service.pricing}
                                        </div>
                                        <button className="w-full py-3 bg-[#E3000F] text-white rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#FF2D3A] transition-colors">
                                            Start Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Ready to Build Your Intelligence?</h2>
                    <button className="px-10 py-5 bg-white text-black rounded-full font-black text-xl uppercase tracking-tighter hover:bg-[#E3000F] hover:text-white transition-all">
                        Book a Free Consultation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
