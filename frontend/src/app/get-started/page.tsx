'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Rocket, Sparkles, Shield } from 'lucide-react';

const GetStartedPage = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            Start Your <span className="text-[var(--accent)]">Journey</span>
                        </h1>
                        <p className="text-[var(--muted)] text-xl max-w-2xl mx-auto">
                            Fill out the form below and our AI strategy team will be in touch within 24 hours.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-center">
                            <Rocket className="text-[var(--accent)] mx-auto mb-4" size={32} />
                            <h3 className="font-bold mb-2">Fast Onboarding</h3>
                            <p className="text-xs text-[var(--muted)]">Get your project started in days, not weeks.</p>
                        </div>
                        <div className="p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-center">
                            <Sparkles className="text-[var(--accent)] mx-auto mb-4" size={32} />
                            <h3 className="font-bold mb-2">AI First</h3>
                            <p className="text-xs text-[var(--muted)]">Every solution is powered by cutting-edge LLMs.</p>
                        </div>
                        <div className="p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-center">
                            <Shield className="text-[var(--accent)] mx-auto mb-4" size={32} />
                            <h3 className="font-bold mb-2">Secure & Scale</h3>
                            <p className="text-xs text-[var(--muted)]">Enterprise-grade security from day one.</p>
                        </div>
                    </div>

                    <form className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Full Name</label>
                                <input 
                                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 focus:border-[var(--accent)] outline-none transition-all text-[var(--foreground)]"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Work Email</label>
                                <input 
                                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 focus:border-[var(--accent)] outline-none transition-all text-[var(--foreground)]"
                                    placeholder="john@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Project Brief</label>
                            <textarea 
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 focus:border-[var(--accent)] outline-none h-40 resize-none transition-all text-[var(--foreground)]"
                                placeholder="Tell us about your vision..."
                            />
                        </div>

                        <button className="w-full py-5 bg-[#E3000F] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#FF2D3A] transition-all">
                            <span>Submit Project Inquiry</span>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetStartedPage;
