"use server";

export async function getPageSpeedMetrics(url: string) {
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not configured");
  }

  const targetUrl = url.startsWith('http') ? url : `https://${url}`;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=PERFORMANCE&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to fetch PageSpeed data");
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
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
  }
}
