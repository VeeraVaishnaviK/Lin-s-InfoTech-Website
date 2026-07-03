'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, User, Tag, Share2 } from 'lucide-react';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/endpoints';

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    author?: { name: string; role?: string };
    category?: string;
    coverImage?: string;
    publishedAt: string;
    readingTime?: string;
}

const BlogDetailPage = () => {
    const { slug } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        const fetchPost = async () => {
            try {
                const response = await api.get(ENDPOINTS.BLOG_BY_SLUG(slug as string));
                // Backend returns { success: true, data: blog }
                setPost(response.data.data);
            } catch (err: any) {
                console.error('Failed to fetch blog post:', err);
                setError('We couldn\'t find the blog post you are looking for.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
                <div className="space-y-4 text-center">
                    <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[var(--muted)] text-sm uppercase tracking-widest animate-pulse">Loading post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-[var(--foreground)]">Post Not Found</h2>
                    <p className="text-[var(--muted)] mb-8">{error || 'This blog post could not be loaded.'}</p>
                    <button
                        onClick={() => router.push('/blog')}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-[var(--accent)] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[var(--accent)]/90 transition-all"
                    >
                        <ChevronLeft size={16} />
                        <span>Back to Blog</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                    >
                        <ChevronLeft size={16} />
                        <span>Back to Insights</span>
                    </Link>
                </motion.div>

                {/* Hero Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <span className="px-4 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-[var(--accent)]/20">
                            {post.category || 'Technology'}
                        </span>
                        <div className="flex items-center space-x-2 text-[var(--muted)] text-[10px] uppercase tracking-widest font-bold">
                            <Clock size={12} className="text-[var(--accent)]" />
                            <span>{post.readingTime || '5m'} Read</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-8 text-[var(--foreground)]">
                        {post.title}
                    </h1>

                    {/* Author & Date Card */}
                    <div className="flex flex-wrap items-center justify-between border-y border-[var(--border)] py-6 gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-[var(--border)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]">
                                <User size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-sm text-[var(--foreground)]">{post.author?.name || 'Rejolin Solomon J'}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">{post.author?.role || 'Founder & CEO'}</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 text-xs text-[var(--muted)] font-bold uppercase tracking-widest">
                            <div className="flex items-center space-x-2">
                                <Calendar size={14} className="text-[var(--accent)]" />
                                <span>{new Date(post.publishedAt || post._id).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Cover Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-[21/9] rounded-[2rem] overflow-hidden border border-[var(--border)] mb-12"
                >
                    <Image
                        src={post.coverImage || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert max-w-none text-lg leading-relaxed text-[var(--foreground)]/80 space-y-6"
                >
                    {post.content.split('\n').map((paragraph, index) => {
                        if (!paragraph.trim()) return null;
                        return (
                            <p key={index} className="mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-[var(--accent)] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] drop-shadow-sm">
                                {index === 0 ? paragraph : paragraph}
                            </p>
                        );
                    })}
                </motion.article>

                {/* Tags and Share */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-[var(--border)] mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                    <div className="flex flex-wrap gap-2 items-center">
                        <Tag size={16} className="text-[var(--accent)] mr-2" />
                        {['AI', 'Business', 'Innovation', 'Future'].map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-[var(--border)] text-xs text-[var(--foreground)]/70 rounded-md font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (navigator.clipboard) {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }
                        }}
                        className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                    >
                        <Share2 size={16} />
                        <span>Copy Link</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
