'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Send, CheckCircle, Info } from 'lucide-react';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/endpoints';
import { cn } from '@/lib/utils';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // reCAPTCHA v3 check would go here (requires site key)
        // const token = await executeRecaptcha('contact_form');

        try {
            await api.post(ENDPOINTS.CONTACT, formData);
            setIsSuccess(true);
            setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again or email us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
                <div className="text-center max-w-lg">
                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent)]/10 mb-8">
                        <CheckCircle size={48} className="text-[var(--accent)]" />
                    </div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-[var(--foreground)] mb-4">Message Received!</h2>
                    <p className="text-[var(--muted)] text-lg mb-10">
                        Thank you for reaching out. Lin and the team will review your project details and get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="px-8 py-3 bg-[var(--accent)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[var(--accent)]/90 transition-all"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left: Info */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                                Let&apos;s Build <br />
                                <span className="text-[var(--accent)]">Something.</span>
                            </h1>
                            <p className="text-[var(--muted)] text-xl leading-relaxed max-w-md">
                                Have a project idea or need a technical partner? We&apos;re ready to turn your vision into intelligent software.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <a href="mailto:hello@linsinfotech.com" className="group flex items-center space-x-6">
                                <div className="h-14 w-14 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)]">Email Us</div>
                                    <div className="text-lg font-bold text-[var(--foreground)]">hello@linsinfotech.com</div>
                                </div>
                            </a>

                            <div className="flex space-x-4 pt-4">
                                <a 
                                    href="https://www.linkedin.com/company/lin-s-infotech/posts/?feedView=all" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="h-12 w-12 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                                >
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="p-8 bg-[var(--card)] border-l-4 border-[var(--accent)] rounded-r-2xl">
                            <div className="flex items-start space-x-4">
                                <Info size={24} className="text-[var(--accent)] shrink-0" />
                                <p className="text-sm text-[var(--muted)] leading-relaxed italic">
                                    &ldquo;We usually reply to new inquiries within 24 hours. For urgent AI deployments, please mention it in the subject.&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-[var(--card)] border border-[var(--border)] p-8 md:p-12 rounded-[2rem] shadow-2xl relative">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Project Type</label>
                                    <select
                                        required
                                        value={formData.projectType}
                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="AI Development">AI / ML Development</option>
                                        <option value="Web Development">Web Application</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="Automation">Process Automation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Estimated Budget</label>
                                    <select
                                        required
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none"
                                    >
                                        <option value="">Select Range</option>
                                        <option value="2-5k">$2,000 - $5,000</option>
                                        <option value="5-10k">$5,000 - $10,000</option>
                                        <option value="10-25k">$10,000 - $25,000</option>
                                        <option value="25k+">$25,000+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                                    placeholder="Tell us about your project goals..."
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-[var(--accent)] text-white rounded-xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[var(--accent)]/90 transition-all flex items-center justify-center space-x-4 shadow-[0_10px_30px_rgba(227,0,15,0.3)] disabled:opacity-50"
                            >
                                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                                {!isSubmitting && <Send size={18} />}
                            </button>

                            <p className="text-center text-[10px] text-[var(--muted)] uppercase tracking-[0.1em] mt-6">
                                Protected by Enterprise reCAPTCHA v3
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
