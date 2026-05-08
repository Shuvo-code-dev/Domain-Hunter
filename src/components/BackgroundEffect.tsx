"use client";

import { motion } from "framer-motion";

export const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#020205]">
      {/* Animated Mesh Base */}
      <div className="absolute inset-0 mesh-gradient opacity-40 animate-pulse-slow" />
      
      {/* Dynamic Blobs */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 100, -50],
          rotate: [0, 180, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-brand-primary/20 rounded-full blur-[150px] mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [100, -50, 100],
          rotate: [360, 180, 0],
          scale: [1, 1.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] bg-brand-secondary/20 rounded-full blur-[150px] mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[120px] mix-blend-overlay"
      />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};
