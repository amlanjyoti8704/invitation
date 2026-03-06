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
    return Response.json({
      status: "invalid"
    });
  }

  if (booking.used) {
    return Response.json({
      status: "already_used"
    });
  }

  booking.used = true;
  await booking.save();

  return Response.json({
    status: "valid",
    eventTitle: booking.eventTitle,
    userEmail: booking.userEmail
  });
}