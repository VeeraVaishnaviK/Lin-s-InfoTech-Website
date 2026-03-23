'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    History,
    FileText,
    LogOut,
    ChevronRight,
    Bot
} from 'lucide-react';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

const SIDEBAR_LINKS = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/client-portal/dashboard' },
    { label: 'Project Updates', icon: <History size={20} />, href: '/client-portal/updates' },
    { label: 'Invoices', icon: <FileText size={20} />, href: '/client-portal/invoices' },
];

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // Don't show sidebar on the login page
    if (pathname === '/client-portal') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        try {
            await api.delete('/auth/logout');
            router.push('/client-portal');
        } catch (error) {
            // Fallback redirect if API fails
            router.push('/client-portal');
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-[#111111] border-r border-[#1F1F1F] flex flex-col shrink-0 z-20">
                {/* Sidebar Header */}
                <div className="p-8">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-[#E3000F] rounded-xl flex items-center justify-center">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-black uppercase tracking-tighter leading-none">Lin&apos;s</div>
                            <div className="text-[10px] font-bold text-[#E3000F] uppercase tracking-widest mt-1">InfoTech</div>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 py-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-6 px-4">Menu</div>
                    {SIDEBAR_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center justify-between px-4 py-4 rounded-xl transition-all group relative overflow-hidden",
                                    isActive
                                        ? "bg-[#E3000F]/10 text-[#E3000F] border border-[#E3000F]/20"
                                        : "text-white/40 hover:text-white hover:bg-[#1F1F1F]"
                                )}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={cn(
                                        "transition-colors",
                                        isActive ? "text-[#E3000F]" : "text-white/20 group-hover:text-white"
                                    )}>
                                        {link.icon}
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-tight">{link.label}</span>
                                </div>
                                {isActive && <ChevronRight size={16} />}

                                {isActive && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-[#E3000F]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer (Logout) */}
                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-4 px-4 py-4 text-white/40 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-tight">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative scrollbar-thin scrollbar-thumb-[#1F1F1F]">
                {/* Dynamic Header */}
                <header className="h-20 border-b border-[#1F1F1F] flex items-center justify-between px-10 shrink-0 sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-xl z-10">
                    <h2 className="text-sm font-black uppercase tracking-widest text-[#888]">
                        {SIDEBAR_LINKS.find(l => l.href === pathname)?.label || 'Client Portal'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden md:block">
                            <div className="text-xs font-bold uppercase tracking-tight">Client Hub</div>
                            <div className="text-[10px] text-white/30 uppercase tracking-widest">v1.2.0</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#1F1F1F] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-10 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
