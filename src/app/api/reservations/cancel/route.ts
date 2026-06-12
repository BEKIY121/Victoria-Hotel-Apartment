import { NextResponse } from "next/server";
import {
  cancelReservationByRef,
  mapReservation,
} from "@/lib/booking-service";
import { notifyBookingCancelled } from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const { ref, email } = await request.json();

    if (!ref?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Booking reference and email are required" },
        { status: 400 }
      );
    }

    const reservation = await cancelReservationByRef(ref, email);
    notifyBookingCancelled(reservation.id).catch(console.error);

    return NextResponse.json({
      reservation: mapReservation(reservation),
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cancellation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
