"use client";

import { motion } from "framer-motion";
import { Zap, Clock, MousePointer2, LayoutPanelLeft, LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  status: "good" | "average" | "poor";
  delay: number;
}

const MetricCard = ({ label, value, icon: Icon, status, delay }: MetricCardProps) => {
  const statusColors = {
    good: "text-brand-primary border-brand-primary/20 bg-brand-primary/5",
    average: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
    poor: "text-brand-accent border-brand-accent/20 bg-brand-accent/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass glass-hover p-8 rounded-[2rem] flex flex-col gap-6 relative group overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className={cn("p-3 rounded-2xl", statusColors[status])}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Status</span>
          <span className={cn("text-[11px] font-bold uppercase", statusColors[status].split(' ')[0])}>
            {status}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-white/40 mb-1">{label}</h3>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export const MetricsGrid = ({ metrics, isLoading }: { metrics: { lcp: string; tbt: string; fid: string; cls: string } | null, isLoading: boolean }) => {
  if (isLoading || !metrics) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="glass p-6 rounded-2xl h-32 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
      <MetricCard
        label="Largest Contentful Paint"
        value={metrics.lcp}
        icon={LayoutPanelLeft}
        status={parseFloat(metrics.lcp) < 2.5 ? "good" : "average"}
        delay={0.1}
      />
      <MetricCard
        label="Total Blocking Time"
        value={metrics.tbt}
        icon={Zap}
        status={parseFloat(metrics.tbt) < 200 ? "good" : "average"}
        delay={0.2}
      />
      <MetricCard
        label="First Input Delay"
        value={metrics.fid}
        icon={MousePointer2}
        status={parseFloat(metrics.fid) < 100 ? "good" : "poor"}
        delay={0.3}
      />
      <MetricCard
        label="Cumulative Layout Shift"
        value={metrics.cls}
        icon={Clock}
        status={parseFloat(metrics.cls) < 0.1 ? "good" : "average"}
        delay={0.4}
      />
    </div>
  );
};
