"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Building, Shield, Save, Loader2, Camera } from "lucide-react";
import { authService } from "@/lib/services/auth";

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await authService.getMe();
                setUser(data.data.user);
            } catch (err) {
                console.error("Failed to fetch user");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                    <p className="text-white/40 text-sm">Manage your account settings and preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="glass-card p-8 rounded-[2rem] border border-white/5 text-center flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                            <User className="w-16 h-16 text-primary" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                    <p className="text-sm text-white/40 mb-6">{user?.email}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                        <Shield className="w-3 h-3" />
                        {user?.role} Account
                    </div>
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2 glass-card p-8 rounded-[2rem] border border-white/5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-white/40 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                <input
                                    type="text"
                                    defaultValue={user?.name}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-white/40 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                <input
                                    type="email"
                                    disabled
                                    defaultValue={user?.email}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white opacity-50 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-white/40 ml-1">Company</label>
                            <div className="relative">
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                <input
                                    type="text"
                                    defaultValue={user?.company || "Not specified"}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <button
                            disabled={saving}
                            className="px-8 py-3 bg-primary hover:bg-primary-bright disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(227,0,15,0.4)]"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
