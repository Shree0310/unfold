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
      className={`rounded-xl bg-white p-6 shadow-lg border border-gray-100 ${className}`}
    >
      {children}
    </motion.div>
  );
}
