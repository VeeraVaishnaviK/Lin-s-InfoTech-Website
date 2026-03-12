"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Bot,
    LayoutDashboard,
    Briefcase,
    FileText,
    BrainCircuit,
    Settings,
    LogOut,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { authService } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
        { name: "My Projects", icon: Briefcase, href: "/dashboard/projects" },
        { name: "Invoices", icon: FileText, href: "/dashboard/invoices" },
        { name: "AI Tools", icon: BrainCircuit, href: "/dashboard/ai" },
        { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    ];

    const handleLogout = async () => {
        try {
            await authService.logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <aside className="w-72 hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-background border-r border-white/5 z-40">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                        <Bot className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        Lin's <span className="text-primary">Dev</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-grow px-4 mt-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-primary text-white shadow-[0_0_15px_rgba(227,0,15,0.3)]"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="w-1 h-5 bg-white rounded-full"
                                />
                            )}
                            {!isActive && (
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
