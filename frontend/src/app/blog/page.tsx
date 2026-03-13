'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/endpoints';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    author: { name: string };
    category: string;
    coverImage: string;
    publishedAt: string;
    readingTime: string;
}

const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get(ENDPOINTS.BLOG);
                setPosts(response.data.posts || []);
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="bg-[#0A0A0A] text-white pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                        Insights & <span className="text-[#E3000F]">Updates</span>
                    </h1>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto">
                        Deep dives into AI, automation, and the technology trends shaping the modern business landscape.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] bg-[#111111] animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-[#1F1F1F] rounded-3xl">
                        <p className="text-white/30 text-lg uppercase tracking-widest">No blog posts found.</p>
                        <p className="text-white/20 text-sm mt-2">Check back soon for our latest updates.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="group relative bg-[#111111] border border-[#1F1F1F] rounded-3xl overflow-hidden hover:border-[#E3000F]/30 transition-all duration-500"
                            >
                                <div className="relative aspect-video">
                                    <Image
                                        src={post.coverImage || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop'}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-[#E3000F] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-white/5">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center space-x-6 text-[#888] text-[10px] uppercase tracking-widest font-bold mb-6">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={12} className="text-[#E3000F]" />
                                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock size={12} className="text-[#E3000F]" />
                                            <span>{post.readingTime || '5m'} Read</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-[#E3000F] transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h3>

                                    <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="flex items-center space-x-2 text-white font-black text-xs uppercase tracking-[0.2em] group-hover:space-x-4 transition-all"
                                    >
                                        <span>Read More</span>
                                        <ChevronRight size={14} className="text-[#E3000F]" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
