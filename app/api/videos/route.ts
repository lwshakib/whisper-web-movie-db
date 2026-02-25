import { NextRequest, NextResponse } from "next/server";
import { fetchMovieVideos, fetchTVVideos } from "@/TMDB/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const data = type === "tv" ? await fetchTVVideos(id) : await fetchMovieVideos(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
