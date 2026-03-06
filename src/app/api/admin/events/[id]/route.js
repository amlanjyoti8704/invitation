import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function DELETE(req, context) {

  const params = await context.params;

  await connectDB();

  await Event.findByIdAndDelete(params.id);

  return Response.json({ message: "Event deleted" });
}

export async function PUT(req, context) {

  const params = await context.params;
  const body = await req.json();

  await connectDB();

  const event = await Event.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return Response.json(event);
}