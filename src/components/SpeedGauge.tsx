"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpeedGaugeProps {
  score: number;
  label: string;
  isLoading?: boolean;
}

export const SpeedGauge = ({ score, label, isLoading }: SpeedGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!isLoading && score > 0) {
      const timeout = setTimeout(() => {
        setDisplayScore(score);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [score, isLoading]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const currentDisplay = isLoading ? 0 : displayScore;
  const strokeDashoffset = circumference - (currentDisplay / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 90) return "stroke-brand-primary";
    if (s >= 50) return "stroke-yellow-400";
    return "stroke-brand-accent";
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-56 h-56 transform -rotate-90 drop-shadow-[0_0_15px_rgba(0,242,255,0.1)]">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-primary)" />
            <stop offset="100%" stopColor="var(--color-brand-secondary)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Background circle */}
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />
        {/* Progress circle */}
        <motion.circle
          cx="112"
          cy="112"
          r={radius}
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          fill="transparent"
          strokeLinecap="round"
          filter="url(#glow)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          key={displayScore}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <span className="text-6xl font-black tracking-tighter">
            {isLoading ? "--" : displayScore}
          </span>
          <div className={cn(
            "mt-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            displayScore >= 90 ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary" : 
            displayScore >= 50 ? "bg-yellow-400/10 border-yellow-400/20 text-yellow-400" : 
            "bg-brand-accent/10 border-brand-accent/20 text-brand-accent"
          )}>
            {displayScore >= 90 ? "Fast" : displayScore >= 50 ? "Average" : "Slow"}
          </div>
        </motion.div>
      </div>
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-brand-primary/20 border-t-brand-primary rounded-full"
        />
      )}
    </div>
  );
};
