import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const mode = searchParams.get("mode") || "driving";
  console.log("Received request with params:", { origin, destination, mode });

  if (!origin || !destination) {
    return NextResponse.json(
      {
        error: "OriginId and destinationId are required",
      },
      { status: 400 },
    );
  }
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const BASE_URL = "https://maps.googleapis.com/maps/api/directions/json";
  try {
    const response = await axios.get(BASE_URL, {
      params: { origin, destination, mode, key: API_KEY },
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
