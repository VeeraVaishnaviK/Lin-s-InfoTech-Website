"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Bell, Search, User } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#050505] flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-grow lg:ml-72 flex flex-col min-h-screen">
                    {/* Header */}
                    <header className="h-20 border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="text"
                                placeholder="Search projects or AI tasks..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(227,0,15,0.8)]" />
                            </button>

                            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-white leading-none mb-1">Lin Member</p>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Standard Client</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary flex items-center justify-center border border-white/10">
                                    <User className="text-white w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="p-8 flex-grow">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
