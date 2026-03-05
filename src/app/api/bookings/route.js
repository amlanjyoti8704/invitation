import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  await connectDB();

  const bookings = await Booking.find().sort({ createdAt: -1 });

  return Response.json(bookings);
}