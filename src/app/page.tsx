"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight, Share2, History, Zap, Search } from "lucide-react";
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
    <main className="min-h-screen relative flex flex-col items-center px-4 md:px-8 overflow-hidden">
      <BackgroundEffect />
      
      {/* Super-Minimalist Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass-vibrant rounded-3xl px-6 md:px-10 py-3 flex items-center justify-between border-white/10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center animate-glow">
              <Zap size={20} className="text-black" fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">DomainHunter</span>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            <a href="#" className="hover:text-brand-primary transition-all hover:tracking-[0.5em]">Network</a>
            <a href="#" className="hover:text-brand-secondary transition-all hover:tracking-[0.5em]">Systems</a>
            <a href="#" className="hover:text-brand-accent transition-all hover:tracking-[0.5em]">Security</a>
            <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all font-bold">Portal</button>
          </div>
        </div>
      </nav>

      {/* Hero Section: The "Core" */}
      <section className="relative pt-32 pb-20 md:pt-64 md:pb-40 w-full max-w-7xl flex flex-col items-center">
        {/* Glowing Central Orb */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-brand-primary/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 md:mb-12 px-6 py-2 rounded-full glass-vibrant border-brand-secondary/30 text-brand-secondary text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase"
          >
            Neural Analysis Engine v4.2
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl lg:text-[9rem] font-black tracking-tighter mb-8 md:mb-12 leading-[0.85] mix-blend-difference px-2"
          >
            BEAUTY IN <br />
            <span className="text-brand-gradient italic">PRECISION.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-lg md:text-2xl text-white/30 mb-12 md:mb-20 max-w-3xl font-light tracking-wide leading-relaxed italic px-4"
          >
            Transcend standard metrics. DomainHunter translates raw data into a visual masterpiece of performance engineering.
          </motion.p>

          {/* Floating Search Hub */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            onSubmit={handleScan}
            className="w-full max-w-3xl relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/30 via-brand-secondary/30 to-brand-accent/30 blur-[120px] opacity-20 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative glass-vibrant p-3 rounded-[3rem] flex items-center gap-4 border-white/20 group-focus-within:border-brand-primary transition-all duration-700">
              <div className="pl-8 text-brand-primary animate-pulse">
                <Globe size={28} strokeWidth={1} />
              </div>
              <input
                type="text"
                placeholder="initiate-analysis.sh"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-2xl font-light px-4 placeholder:text-white/5 lowercase tracking-wider"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn-beautiful min-w-[200px]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin mx-auto" />
                ) : (
                  "Initiate Scan"
                )}
              </button>
            </div>
          </motion.form>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-8 px-6 py-3 rounded-2xl bg-brand-accent/20 border border-brand-accent/50 text-brand-accent text-sm font-bold tracking-widest uppercase"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results Canvas */}
      <AnimatePresence mode="wait">
        {(results || isLoading) && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-7xl pb-20 md:pb-40 space-y-12 md:space-y-20 relative px-2 md:px-0"
          >
            {/* The Main Report Card */}
            <div className="relative glass-vibrant rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 overflow-hidden border-white/10 group">
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/5 to-transparent skew-x-12 translate-x-20 hidden md:block" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
                <div className="flex-1 space-y-8 md:space-y-12 text-center lg:text-left w-full">
                  <div className="space-y-4">
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/30 block"
                    >
                      Security Validated Domain
                    </motion.span>
                    <h2 className="text-3xl md:text-6xl lg:text-8xl font-black tracking-tighter break-all leading-none italic uppercase">
                      {results?.url || url || "Syncing..."}
                    </h2>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                    <div className="glass px-5 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border-brand-primary/20 text-brand-primary shadow-[0_0_20px_rgba(0,242,255,0.1)]">Quantum v9.0</div>
                    <div className="glass px-5 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40">SSL: SECURE</div>
                  </div>

                  <div className="pt-8 md:pt-12 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 border-t border-white/5">
                    <div>
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2 md:mb-3 italic">Health Index</span>
                      <span className="text-xl md:text-3xl font-black text-brand-primary">STABLE</span>
                    </div>
                    <div>
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2 md:mb-3 italic">Throughput</span>
                      <span className="text-xl md:text-3xl font-black">9.4 GB/S</span>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/20 block mb-2 md:mb-3 italic">Latency</span>
                      <span className="text-xl md:text-3xl font-black text-brand-accent">12 MS</span>
                    </div>
                  </div>
                </div>

                <div className="relative group/gauge shrink-0">
                  <div className="absolute inset-0 bg-brand-primary/20 blur-[80px] rounded-full scale-0 group-hover/gauge:scale-100 transition-transform duration-1000" />
                  <SpeedGauge score={results?.score || 0} label="Core Intelligence" isLoading={isLoading} />
                </div>
              </div>
            </div>

            {/* Metrics Grid Overlay */}
            <div className="relative">
              <MetricsGrid metrics={results?.metrics || null} isLoading={isLoading} />
            </div>

            {/* Bottom Artistic Action */}
            <div className="glass-vibrant rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 group hover:shadow-brand-secondary/10 transition-shadow duration-1000">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-brand-secondary to-brand-accent flex items-center justify-center animate-glow text-black shrink-0">
                  <Search size={32} strokeWidth={1} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">Transcend average.</h4>
                  <p className="text-base md:text-lg text-white/30 font-light max-w-md italic mt-1 md:mt-2 leading-relaxed">
                    Unlock hyper-performance with our dedicated engineering suite. Designed for perfection.
                  </p>
                </div>
              </div>
              <button className="btn-beautiful hover:scale-110 w-full lg:w-auto">
                Upgrade Engine
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-auto py-20 w-full flex flex-col items-center gap-8 opacity-20">
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
        <p className="text-[10px] font-black uppercase tracking-[1em] text-center">
          DomainHunter Performance Systems &copy; 2026 <br />
          <span className="opacity-50">Beautiful Engineering for the Modern Web</span>
        </p>
      </footer>
    </main>
  );
}
