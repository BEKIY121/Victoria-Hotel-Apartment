import { NextResponse } from "next/server";
import { getRoomTypes } from "@/lib/data/rooms";

export async function GET() {
  try {
    const rooms = await getRoomTypes();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("GET /api/rooms failed:", error);
    return NextResponse.json(
      { error: "Failed to load rooms" },
      { status: 500 }
    );
  }
}
