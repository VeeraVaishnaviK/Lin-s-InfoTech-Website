"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code, Cpu } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-white/80">
                        The Future of AI is Here
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
                >
                    Engineering the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-bright to-primary text-glow">
                        Intelligent Agency
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    We build production-ready AI solutions, high-end web applications, and
                    automation systems that scale with your vision. Founded by Lin, driven by AI.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="#tools"
                        className="group px-8 py-4 bg-primary text-white font-bold rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(227,0,15,0.4)] hover:shadow-[0_0_35px_rgba(227,0,15,0.6)]"
                    >
                        Explore AI Estimator
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#projects"
                        className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/5 transition-all duration-300"
                    >
                        View Showcase
                    </Link>
                </motion.div>

                {/* Stats Grid Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/10"
                >
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white mb-1">50+</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Projects Done</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white mb-1">12</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">AI Experts</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white mb-1">99%</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Client Success</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white mb-1">24/7</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Ai Support</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
