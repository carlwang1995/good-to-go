import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const maxHeightPx = searchParams.get("heightPx");
  const maxWidthPx = searchParams.get("widthPx");

  if (!name) {
    return NextResponse.json({ error: "name is required." }, { status: 400 });
  }
  if (!maxHeightPx) {
    return NextResponse.json(
      { error: "maxHeightPx is required." },
      { status: 400 },
    );
  }
  if (!maxWidthPx) {
    return NextResponse.json(
      { error: "maxWidthPx is required." },
      { status: 400 },
    );
  }

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const BASE_URL = `https://places.googleapis.com/v1/${name}/media`;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        maxHeightPx,
        maxWidthPx,
        skipHttpRedirect: true,
      },
      headers: {
        "Accept-Language": "zh-TW",
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch data from Google Maps API" },
      { status: 500 },
    );
  }
}
