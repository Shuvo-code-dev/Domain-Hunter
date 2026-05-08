"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
      <svg className="w-48 h-48 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-white/10"
        />
        {/* Progress circle */}
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          fill="transparent"
          strokeLinecap="round"
          className={getColor(displayScore)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          key={displayScore}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl font-bold font-mono"
        >
          {isLoading ? "--" : displayScore}
        </motion.span>
        <span className="text-xs uppercase tracking-widest text-white/50 mt-1">
          {label}
        </span>
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
