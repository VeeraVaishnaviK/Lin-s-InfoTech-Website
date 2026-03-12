"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    Clock,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
    BrainCircuit,
    MessageSquare,
    FileText
} from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
    const stats = [
        { name: "Active Projects", value: "3", icon: Rocket, color: "text-blue-400" },
        { name: "Pending Tasks", value: "12", icon: Clock, color: "text-amber-400" },
        { name: "Completed", value: "48", icon: CheckCircle2, color: "text-green-400" },
        { name: "Efficiency", value: "+24%", icon: TrendingUp, color: "text-primary" },
    ];

    const quickTools = [
        { name: "Chat with AI", desc: "Expert assistant", icon: MessageSquare, href: "/dashboard/ai" },
        { name: "Cost Estimator", desc: "Budget projects", icon: BrainCircuit, href: "/dashboard/ai" },
        { name: "Gen Proposal", desc: "New business", icon: FileText, href: "/dashboard/ai" },
    ];

    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back, <span className="text-primary">Lin Member</span>
                    </h1>
                    <p className="text-white/40 text-sm">
                        Here's what's happening with your projects today.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/dashboard/ai"
                        className="px-6 py-3 bg-primary/10 border border-primary/20 text-primary font-bold rounded-xl flex items-center gap-2 hover:bg-primary/20 transition-all"
                    >
                        Launch AI Tool
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-white/40 text-sm font-medium mb-1">{stat.name}</h3>
                        <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Placeholder */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        Active Projects
                    </h2>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/10">
                                        <Rocket className="text-primary w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">AI Automation System v{i}</h4>
                                        <p className="text-white/40 text-xs">Due in 14 days • Milestone 4/6</p>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <div className="hidden md:block">
                                        <p className="text-white text-sm font-bold">$12,400</p>
                                        <p className="text-green-400 text-[10px] font-bold uppercase tracking-wider">On Track</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                        <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-primary" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Tools */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white">Quick AI Tools</h2>
                    <div className="space-y-4">
                        {quickTools.map((tool) => (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className="flex items-center gap-4 p-4 glass-card rounded-2xl border-white/5 hover:border-primary/30 transition-all group"
                            >
                                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                                    <tool.icon className="w-5 h-5 text-white/40 group-hover:text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-0.5">{tool.name}</h4>
                                    <p className="text-white/40 text-[10px] uppercase tracking-widest">{tool.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
