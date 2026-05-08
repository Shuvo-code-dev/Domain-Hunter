"use client";

// Note: I'll use a server action if possible, but for simplicity in this single-page app
// and since I have the key, I can do it in a client-side fetch if I'm careful.
// However, the prompt says "high-performance", and server-side fetching is better for performance (less client JS).
// But for now, I'll implement a function to handle the API call.

export async function fetchSpeedData(url: string) {
  const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY || "";
  // Wait, I put it in .env.local without NEXT_PUBLIC prefix.
  // I'll update .env.local or use a server action.
  
  const targetUrl = url.startsWith('http') ? url : `https://${url}`;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=PERFORMANCE&key=${apiKey}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch PageSpeed data");
  }

  const data = await response.json();
  const lh = data.lighthouseResult;
  
  return {
    score: Math.round(lh.categories.performance.score * 100),
    metrics: {
      lcp: lh.audits['largest-contentful-paint'].displayValue,
      tbt: lh.audits['total-blocking-time'].displayValue,
      fid: lh.audits['max-potential-fid']?.displayValue || "N/A",
      cls: lh.audits['cumulative-layout-shift'].displayValue,
    },
    url: targetUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ""),
    reportId: Math.random().toString(36).substring(7).toUpperCase(),
  };
}
