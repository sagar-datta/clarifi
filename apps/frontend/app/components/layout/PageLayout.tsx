"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth acceleration/deceleration
      }}
    >
      {children}
    </motion.div>
  );
}
