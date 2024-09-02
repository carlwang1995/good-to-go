import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("params:");
  // const { docId } = params;
  // const docRef = doc(db, "trips", docId);

  // try {
  //   const response = await getDoc(docRef);
  //   const result = response.data();

  //   if (result !== undefined) {
  //     return NextResponse.json({ ok: true, result });
  //   } else {
  //     return NextResponse.json(
  //       { error: true, message: "No data found." },
  //       { status: 404 },
  //     );
  //   }
  // } catch (e) {
  //   console.error(e);
  //   return NextResponse.json(
  //     { error: true, message: "Failed to fetch data." },
  //     { status: 500 },
  //   );
  // }
}
