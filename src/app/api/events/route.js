import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const event = await Event.create(body);

  return Response.json(event);
}

export async function GET() {
  await connectDB();

  const events = await Event.find();

  return Response.json(events);
}