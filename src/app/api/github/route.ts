import { NextResponse } from "next/server";
import { fetchGitHubData, GitHubData } from "@/lib/github";

// Cache the data in memory (resets on server restart)
// Force cache clear on code change
let cachedData: GitHubData | null = null;
let lastFetch: number = 0;
const CACHE_VERSION = 2; // Increment to clear cache

// Cache for 1 hour (3600000ms) - adjust as needed
const CACHE_DURATION = 60 * 60 * 1000;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "bour278";

  // Check if cache is still valid
  const now = Date.now();
  if (cachedData && now - lastFetch < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    const data = await fetchGitHubData(username, token);
    cachedData = data;
    lastFetch = now;

    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub API error:", error);

    // Return cached data if available, even if stale
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}

// Optional: Force refresh endpoint
export async function POST() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "bour278";

  try {
    const data = await fetchGitHubData(username, token);
    cachedData = data;
    lastFetch = Date.now();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to refresh GitHub data" },
      { status: 500 }
    );
  }
}

