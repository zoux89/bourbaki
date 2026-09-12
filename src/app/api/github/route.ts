import { NextResponse } from "next/server";
import { fetchGitHubData, GitHubData } from "@/lib/github";

let cachedData: GitHubData | null = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 60 * 1000;
const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

function json(data: GitHubData) {
  return NextResponse.json(data, { headers: CACHE_HEADERS });
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "bour278";

  const now = Date.now();
  if (cachedData && now - lastFetch < CACHE_DURATION) {
    return json(cachedData);
  }

  try {
    const data = await fetchGitHubData(username, token);
    cachedData = data;
    lastFetch = now;

    return json(data);
  } catch {
    // Do not log request headers or environment variables: the GitHub token
    // must remain server-only.
    console.error("GitHub data refresh failed");

    if (cachedData) {
      return json(cachedData);
    }

    return NextResponse.json(
      {
        error: token
          ? "Failed to fetch GitHub data"
          : "GitHub integration is not configured",
      },
      { status: token ? 502 : 503 }
    );
  }
}

export async function POST() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "bour278";

  try {
    const data = await fetchGitHubData(username, token);
    cachedData = data;
    lastFetch = Date.now();

    return NextResponse.json({ success: true, data });
  } catch {
    console.error("GitHub data refresh failed");
    return NextResponse.json(
      {
        error: token
          ? "Failed to refresh GitHub data"
          : "GitHub integration is not configured",
      },
      { status: token ? 502 : 503 }
    );
  }
}

