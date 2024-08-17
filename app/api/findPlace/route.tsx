import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Input is required." }, { status: 400 });
  }

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const BASE_URL =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
  const fields = "place_id,name,geometry,photo,formatted_address";
  const inputtype = "textquery";
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        input,
        inputtype,
        fields,
        key: API_KEY,
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
