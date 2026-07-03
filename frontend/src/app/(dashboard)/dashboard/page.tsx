"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FolderKanban,
    FileCheck,
    Clock,
    TrendingUp,
    ArrowUpRight,
    Plus
} from "lucide-react";
import Link from "next/link";

const DashboardOverview = () => {
    const stats = [
        { name: "Active Projects", value: "3", icon: FolderKanban, color: "text-primary" },
        { name: "Paid Invoices", value: "12", icon: FileCheck, color: "text-green-500" },
        { name: "Total Requests", value: "48", icon: TrendingUp, color: "text-blue-500" },
        { name: "Pending Review", value: "2", icon: Clock, color: "text-yellow-500" },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Workspace Overview</h1>
                    <p className="text-white/40 text-sm">Welcome back to the future of technology engineering.</p>
                </div>
                <Link
                    href="/dashboard/ai-tools"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-bright text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(227,0,15,0.4)]"
                >
                    <Plus className="w-5 h-5" />
                    New AI Request
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">{stat.name}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity / Projects Preview Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8 rounded-[2rem] border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Project Pipeline</h3>
                        <Link href="/dashboard/projects" className="text-xs text-primary hover:text-white transition-colors font-bold uppercase tracking-widest">View All</Link>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <FolderKanban className="text-primary w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-bold truncate">Project Alpha Phoenix</h4>
                                    <p className="text-sm text-white/40">In Development • 75% Complete</p>
                                </div>
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm text-white font-mono">$12,500</p>
                                    <p className="text-[10px] text-white/20 uppercase">Premium Tier</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2rem] border border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
                    <h3 className="text-xl font-bold text-white mb-6">AI Strategy Advisor</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-8">
                        Your current roadmap has been analyzed by Gemini. 2 potential optimizations
                        found in the automation phase.
                    </p>
                    <button className="w-full py-4 glass bg-primary/20 hover:bg-primary/30 text-white font-bold rounded-2xl transition-all duration-300">
                        View Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
