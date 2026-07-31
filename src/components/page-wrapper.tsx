"use client";

import { motion } from "framer-motion";
import React from "react";

export function PageWrapper({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', ...style }}
    >
      {children}
    </motion.div>
  );
}
