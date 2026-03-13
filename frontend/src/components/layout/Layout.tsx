'use client';

import React from 'react';
import LenisProvider from '@/components/animations/LenisProvider';
import CustomCursor from '@/components/animations/CustomCursor';
import ScrollProgress from '@/components/animations/ScrollProgress';
import Preloader from '@/components/animations/Preloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/animations/PageTransition';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LenisProvider>
            <Preloader />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
            <Footer />
        </LenisProvider>
    );
};

export default Layout;
