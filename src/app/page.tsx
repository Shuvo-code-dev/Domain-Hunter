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
    <main className="min-h-screen relative flex flex-col items-center px-6 py-20 md:py-32">
      <BackgroundEffect />
      
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass rounded-full px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center transition-transform group-hover:rotate-12">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">DomainHunter</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">Analyzer</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">Enterprise</a>
            <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white">Console</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 px-5 py-2 rounded-full glass text-[10px] font-black tracking-[0.3em] uppercase text-brand-primary flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_10px_#00f2ff]" />
          Infrastructure v2.4.0 Active
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
        >
          Speed is the <br />
          <span className="text-brand-gradient">Ultimate Advantage.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-lg md:text-xl text-white/40 mb-16 max-w-2xl font-medium leading-relaxed"
        >
          DomainHunter identifies bottlenecks in milliseconds. Get enterprise-grade performance insights for any domain instantly.
        </motion.p>

        {/* Search Bar Refined */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          onSubmit={handleScan}
          className="w-full max-w-2xl relative group"
        >
          <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative glass p-2 rounded-3xl flex items-center gap-2 border-white/10 focus-within:border-brand-primary/50 transition-colors">
            <div className="pl-6 text-white/20">
              <Globe size={22} strokeWidth={1.5} />
            </div>
            <input
              type="text"
              placeholder="analyze-domain.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-xl font-medium px-4 placeholder:text-white/10"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">Start Analysis</span>
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </motion.form>

        <div className="mt-10 flex gap-10">
          <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors group">
            <History size={16} className="group-hover:rotate-[-20deg] transition-transform" /> Recent Hunts
          </button>
          <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors group">
            <Share2 size={16} className="group-hover:scale-110 transition-transform" /> Export Data
          </button>
        </div>
      </div>

      {/* Results Section Revamped */}
      <AnimatePresence mode="wait">
        {(results || isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl mt-32 space-y-10"
          >
            {/* Main Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 glass p-12 md:p-16 rounded-[3rem] flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <Zap size={200} strokeWidth={0.5} />
                </div>
                
                <div className="flex-1 space-y-8 relative z-10 text-center md:text-left">
                  <div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-4">Live Performance Report</h2>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter truncate max-w-md">
                      {results?.url || url || "Analyzing..."}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="px-5 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest">Desktop V8.2</div>
                    <div className="px-5 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Mobile Switch</div>
                  </div>

                  <div className="pt-6 grid grid-cols-2 gap-8 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-1">Origin Status</span>
                      <span className="text-lg font-bold text-brand-primary">OPTIMIZED</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-1">Server Region</span>
                      <span className="text-lg font-bold">Oregon, US-W</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <SpeedGauge score={results?.score || 0} label="Global Score" isLoading={isLoading} />
                </div>
              </div>

              {/* Side Recommendations */}
              <div className="lg:col-span-4 flex flex-col gap-10">
                <div className="glass p-10 rounded-[3rem] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                      <Zap size={24} />
                    </div>
                    <h4 className="text-xl font-bold mb-3 tracking-tight">System Analysis</h4>
                    <p className="text-sm text-white/40 leading-relaxed">
                      We detected unoptimized media assets. Compressing your imagery could reduce LCP by up to 450ms.
                    </p>
                  </div>
                  <button className="w-full mt-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 font-bold transition-all text-sm tracking-tight">
                    View Optimization Guide
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <MetricsGrid metrics={results?.metrics || null} isLoading={isLoading} />

            {/* Footer Action */}
            <div className="glass p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-brand-primary transition-colors">
                  <Search size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-bold tracking-tight">Want deeper insights?</h4>
                  <p className="text-sm text-white/40">Connect your site for continuous real-time monitoring and automated alerts.</p>
                </div>
              </div>
              <button className="px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                Connect Domain
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-32 pb-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
          Powered by DomainHunter Global Edge Infrastructure
        </p>
      </footer>
    </main>
  );
}
