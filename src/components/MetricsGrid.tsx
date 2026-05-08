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
    good: "text-brand-primary border-brand-primary/20",
    average: "text-yellow-400 border-yellow-400/20",
    poor: "text-brand-accent border-brand-accent/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass p-6 rounded-2xl flex flex-col gap-4 relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg bg-white/5 ${statusColors[status].split(' ')[0]}`}>
          <Icon size={20} />
        </div>
        <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-full bg-white/5 border ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div>
        <h3 className="text-sm text-white/50 mb-1">{label}</h3>
        <p className="text-2xl font-bold font-mono">{value}</p>
      </div>
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
