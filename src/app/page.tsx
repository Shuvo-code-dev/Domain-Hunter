"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight, Share2, History, Zap } from "lucide-react";
import { BackgroundEffect } from "@/components/BackgroundEffect";
import { SpeedGauge } from "@/components/SpeedGauge";
import { MetricsGrid } from "@/components/MetricsGrid";
import { getPageSpeedMetrics } from "@/app/actions";
import { cn } from "@/lib/utils";

interface ScanResults {
  score: number;
  metrics: {
    lcp: string;
    tbt: string;
    fid: string;
    cls: string;
  };
  url: string;
  reportId: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScanResults | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const data = await getPageSpeedMetrics(url);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scan website. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center px-6 py-12 md:py-24">
      <BackgroundEffect />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center glow-primary">
            <Zap className="text-black" size={18} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">DomainHunter</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">API</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <button className="px-4 py-2 rounded-full glass hover:bg-white/10 transition-colors">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
          </span>
          Global Infrastructure v2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          Measure Your Speed <br />
          <span className="text-gradient">Hunt For Performance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/50 mb-12 max-w-xl"
        >
          Get real-time insights into your website&apos;s performance with our high-fidelity tracking engine. Optimized for Core Web Vitals.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleScan}
          className="w-full relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative glass p-2 rounded-2xl flex items-center gap-2">
            <div className="pl-4 text-white/40">
              <Globe size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter your domain (e.g. google.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-lg px-2 placeholder:text-white/20"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "px-6 py-3 rounded-xl bg-white text-black font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100",
                isLoading && "animate-pulse"
              )}
            >
              {isLoading ? "Hunting..." : "Scan Website"}
              {!isLoading && <ChevronRight size={18} />}
            </button>
          </div>
        </motion.form>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex gap-4">
          <button className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors">
            <History size={14} /> View History
          </button>
          <button className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors">
            <Share2 size={14} /> Share Report
          </button>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {(results || isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-5xl mt-24 flex flex-col items-center gap-12"
          >
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 glass p-12 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-mono">
                  Report ID: {results?.reportId || "---"}
                </span>
              </div>

              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Performance Score</h2>
                <p className="text-white/50 mb-6 flex items-center gap-2">
                  <Globe size={14} /> {results?.url || url}
                </p>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] uppercase font-bold text-brand-primary">Desktop</div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-white/40">Mobile</div>
                </div>
              </div>

              <SpeedGauge score={results?.score || 0} label="Overall" isLoading={isLoading} />

              <div className="hidden lg:block w-px h-32 bg-white/10" />

              <div className="flex flex-col gap-4">
                <div className="text-center md:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Status</span>
                  <span className="text-lg font-bold text-brand-primary">OPTIMIZED</span>
                </div>
                <div className="text-center md:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Location</span>
                  <span className="text-lg font-bold">San Francisco, US</span>
                </div>
              </div>
            </div>

            <MetricsGrid metrics={results?.metrics || null} isLoading={isLoading} />

            <div className="w-full glass p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-white/50">
                  <History size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Recommendations</h4>
                  <p className="text-sm text-white/40">Optimize images and reduce unused Javascript to save 1.2s.</p>
                </div>
              </div>
              <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
                Download Full PDF Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-auto pt-24 pb-12 text-white/20 text-[10px] uppercase tracking-widest font-mono">
        &copy; 2026 DomainHunter Performance Systems. All rights reserved.
      </footer>
    </main>
  );
}
