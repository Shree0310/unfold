'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DraggableCardProps {
  id: string;
  children: ReactNode;
  initialX: number;
  initialY: number;
  onDragEnd: (id: string, x: number, y: number) => void;
}

export function DraggableCard({ id, children, initialX, initialY, onDragEnd }: DraggableCardProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onDragEnd={(event, info) => {
        onDragEnd(id, info.point.x, info.point.y);
      }}
      style={{
        position: 'absolute',
        cursor: 'grab',
      }}
      whileDrag={{
        cursor: 'grabbing',
        scale: 1.05,
        zIndex: 1000,
        boxShadow: '0 20px 40px rgba(120,53,15,0.25)'
      }}
    >
      {children}
    </motion.div>
  );
}
