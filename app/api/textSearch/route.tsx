import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { textQuery, languageCode } = await request.json();

  if (!textQuery || !languageCode) {
    return NextResponse.json({ error: "Input is required." }, { status: 400 });
  }

  // console.log(textQuery, languageCode);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
  try {
    const response = await axios.post(
      BASE_URL,
      {
        textQuery,
        languageCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "places.id,nextPageToken,places.displayName,places.formattedAddress,places.location,places.photos,places.currentOpeningHours,places.types,places.rating,places.userRatingCount",
          "Accept-Language": "zh-TW",
        },
      },
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch data from Google Maps API" },
      { status: 500 },
    );
  }
}
