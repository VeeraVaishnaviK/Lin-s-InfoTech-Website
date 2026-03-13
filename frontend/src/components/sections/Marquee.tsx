'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
    Terminal,
    Cpu,
    Database,
    Code2,
    Globe,
    Cloud,
    Layers,
    Bot,
    Workflow,
    Zap
} from 'lucide-react';

const TECH_STACK = [
    { name: 'Next.js', icon: <Globe size={18} /> },
    { name: 'React', icon: <Layers size={18} /> },
    { name: 'Node.js', icon: <Terminal size={18} /> },
    { name: 'Python', icon: <Cpu size={18} /> },
    { name: 'MongoDB', icon: <Database size={18} /> },
    { name: 'FastAPI', icon: <Zap size={18} /> },
    { name: 'TailwindCSS', icon: <Code2 size={18} /> },
    { name: 'OpenAI', icon: <Bot size={18} /> },
    { name: 'Docker', icon: <Cloud size={18} /> },
    { name: 'Vercel', icon: <Globe size={18} /> },
];

const Marquee: React.FC = () => {
    return (
        <section className="bg-[#0A0A0A] border-y border-[#1F1F1F] overflow-hidden py-12 group">
            <div className="flex whitespace-nowrap animate-marquee group-hover:pause">
                {[1, 2, 3].map((loop) => (
                    <div key={loop} className="flex items-center">
                        {TECH_STACK.map((tech) => (
                            <div
                                key={tech.name}
                                className="flex items-center gap-3 px-10 text-[#444] transition-colors hover:text-[#E3000F] cursor-default"
                            >
                                <span className="opacity-50">{tech.icon}</span>
                                <span className="text-xl font-bold uppercase tracking-widest">{tech.name}</span>
                                <span className="mx-4 text-[#1F1F1F]">•</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee-tech {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee-tech 20s linear infinite;
          display: flex;
          width: 300%;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};

export default Marquee;
