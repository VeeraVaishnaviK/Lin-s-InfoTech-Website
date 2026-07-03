'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, Rocket, Sparkles, Shield, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/endpoints';

const SERVICE_NAMES: Record<string, string> = {
    ai: 'AI Development',
    web: 'Web Development',
    mobile: 'Mobile App',
    automation: 'Automation',
    chatbots: 'AI Development',
    analytics: 'AI Development',
};

const GetStartedForm = () => {
    const searchParams = useSearchParams();
    const serviceId = searchParams.get('service') || '';
    const serviceName = SERVICE_NAMES[serviceId] || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: serviceName || 'Other',
        message: ''
    });

    // Update projectType if service query parameter changes
    useEffect(() => {
        if (serviceName) {
            setFormData(prev => ({
                ...prev,
                projectType: serviceName,
                message: prev.message || `Hi! I am interested in starting a ${serviceName} project with Lin's InfoTech.`
            }));
        }
    }, [serviceName]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await api.post(ENDPOINTS.CONTACT, {
                name: formData.name,
                email: formData.email,
                projectType: formData.projectType,
                message: formData.message
            });
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center max-w-lg mx-auto py-12">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent)]/10 mb-8">
                    <CheckCircle size={48} className="text-[var(--accent)]" />
                </div>
                <h2 className="text-5xl font-black uppercase tracking-tighter text-[var(--foreground)] mb-4">Request Sent!</h2>
                <p className="text-[var(--muted)] text-lg mb-10">
                    Thank you. Our strategy team has received your project brief and will connect with you within 24 hours.
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', projectType: 'Other', message: '' });
                    }}
                    className="px-8 py-3 bg-[var(--accent)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[var(--accent)]/90 transition-all"
                >
                    Send Another Request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                    {error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Full Name</label>
                    <input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 focus:border-[var(--accent)] outline-none transition-all text-[var(--foreground)]"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Work Email</label>
                    <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 focus:border-[var(--accent)] outline-none transition-all text-[var(--foreground)]"
                        placeholder="john@company.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Project Type</label>
                    <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 focus:border-[var(--accent)] outline-none transition-all text-[var(--foreground)]"
                    >
                        <option value="AI Development">AI Development</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Automation">Automation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Project Brief</label>
                <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 focus:border-[var(--accent)] outline-none h-40 resize-none transition-all text-[var(--foreground)]"
                    placeholder="Tell us about your vision..."
                />
            </div>

            <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#E3000F] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#FF2D3A] transition-all disabled:opacity-50"
            >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Project Inquiry'}</span>
                <Send size={18} />
            </button>
        </form>
    );
};

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

                    <Suspense fallback={<div className="text-center py-12">Loading form...</div>}>
                        <GetStartedForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default GetStartedPage;
