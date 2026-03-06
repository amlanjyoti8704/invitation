import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req) {

  const body = await req.json();

  const qrData = JSON.parse(body.qrData);

  await connectDB();

  const booking = await Booking.findOne({
    paymentIntentId: qrData.paymentIntent
  });

  if (!booking) {
    return Response.json(
      { error: "Invalid Ticket" },
      { status: 404 }
    );
  }

  return Response.json(booking);
}