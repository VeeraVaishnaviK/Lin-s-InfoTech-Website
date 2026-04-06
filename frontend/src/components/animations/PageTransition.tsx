'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
