'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
                gsap.to(menuRef.current, {
                    x: 0,
                    duration: 0.6,
                    ease: 'power4.out',
                });
            } else {
                document.body.style.overflow = 'auto';
                gsap.to(menuRef.current, {
                    x: '100%',
                    duration: 0.6,
                    ease: 'power4.in',
                });
            }
        });

        return () => ctx.revert();
    }, [isMenuOpen]);

    if (!mounted) return null;

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between',
                    isScrolled ? 'backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]' : 'bg-transparent'
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 text-[var(--primary)] font-bold text-xl tracking-tighter">
                    <img 
                        src={theme === 'dark' ? '/logo-white.png' : '/logo-dark.png'} 
                        alt="Lin's InfoTech Logo" 
                        className="h-16 w-auto object-contain" 
                    />
                    <span>LIN&apos;S INFOTECH</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-[var(--foreground)] text-sm font-medium transition-colors hover:text-[var(--accent)] group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-[var(--muted)]/20 transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link
                        href="/ai-tools"
                        className="hidden sm:block px-5 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-sm font-semibold transition-all hover:bg-[var(--primary-hover)]"
                    >
                        Get Started
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        ref={hamburgerRef}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-[var(--foreground)] z-[101]"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-[var(--background)] z-[100] translate-x-full flex flex-col items-center justify-center space-y-8"
            >
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-4xl font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
                <Link
                    href="/ai-tools"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-8 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-lg font-bold"
                >
                    Get Started
                </Link>
            </div>
        </>
    );
};

export default Navbar;
