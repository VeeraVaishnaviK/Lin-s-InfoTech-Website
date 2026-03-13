'use client';

import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS_ROW1 = [
    { name: 'Sarah Johnson', company: 'AI Vision Inc.', quote: "Lin's development team transformed our manual data entry into a fully automated AI pipeline. The ROI was immediate." },
    { name: 'David Chen', company: 'Nexus Logistics', quote: "The horizontal scrolling UI and attention to detail they provided for our dashboard was beyond our expectations." },
    { name: 'Elena Rodriguez', company: 'Digital Pulse', quote: "Lin is a true expert in the field. Their ability to solve complex architectural problems with AI is unmatched." },
    { name: 'Michael Smith', company: 'ScaleUp SaaS', quote: "From concept to deployment, the process was seamless. Our user engagement tripled after their AI integration." },
];

const TESTIMONIALS_ROW2 = [
    { name: 'Sophie Laurent', company: 'TechFlow Systems', quote: "The custom automation they built saved our team 40 hours a week. A game changer for our operations." },
    { name: 'James Wilson', company: 'CloudBridge', quote: "Premium experience from start to finish. The animations and UI are world-class. Highly recommend." },
    { name: 'Amina Khatri', company: 'NextGen Retail', quote: "They didn't just build a website; they built an intelligent sales engine. The AI chatbot is incredibly smart." },
    { name: 'Robert Miller', company: 'Innovate AI', quote: "Professional, efficient, and innovative. Lin's InfoTech is the best partner for any AI project." },
];

const TestimonialCard = ({ name, company, quote }: { name: string; company: string; quote: string }) => (
    <div className="w-[320px] md:w-[380px] shrink-0 bg-[#111111]/80 backdrop-blur-md border border-[#1F1F1F] rounded-2xl p-6 flex flex-col justify-between transition-colors hover:border-[#E3000F] mx-4">
        <div>
            <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#E3000F] text-[#E3000F]" />
                ))}
            </div>
            <p className="text-white/70 text-sm md:text-base italic leading-relaxed mb-6">
                &ldquo;{quote}&rdquo;
            </p>
        </div>
        <div className="flex flex-col">
            <span className="text-white font-bold text-sm">{name}</span>
            <span className="text-[#888] text-xs uppercase tracking-widest mt-1">{company}</span>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-[#0A0A0A] overflow-hidden group/main">
            <div className="container mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                    What Clients <span className="text-[#E3000F]">Say</span>
                </h2>
            </div>

            {/* Row 1: Left to Right */}
            <div className="flex whitespace-nowrap animate-marquee-left group/main-hover:pause mb-8">
                {[1, 2].map((loop) => (
                    <div key={loop} className="flex">
                        {TESTIMONIALS_ROW1.map((item, idx) => (
                            <TestimonialCard key={`${loop}-${idx}`} {...item} />
                        ))}
                    </div>
                ))}
            </div>

            {/* Row 2: Right to Left */}
            <div className="flex whitespace-nowrap animate-marquee-right group/main-hover:pause">
                {[1, 2].map((loop) => (
                    <div key={loop} className="flex">
                        {TESTIMONIALS_ROW2.map((item, idx) => (
                            <TestimonialCard key={`${loop}-${idx}`} {...item} />
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default Testimonials;
