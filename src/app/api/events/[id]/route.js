import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(req, context) {
  await connectDB();

  const { id } = await context.params;

  const event = await Event.findById(id);

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  return Response.json(event);
}