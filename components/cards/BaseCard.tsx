'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  className?: string;
}

export function BaseCard({ children, className = '' }: BaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.5,
      }}
      drag={false}
      className={`rounded-2xl bg-white p-6 shadow-md border border-amber-200 hover:shadow-xl transition-shadow ${className}`}
      style={{ pointerEvents: 'auto', userSelect: 'none' }}
    >
      {children}
    </motion.div>
  );
}
