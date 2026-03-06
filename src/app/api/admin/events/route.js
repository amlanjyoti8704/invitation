import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { revalidatePath } from "next/cache";

export async function POST(req) {

  const body = await req.json();

  await connectDB();

  const event = await Event.create({
    title: body.title,
    description: body.description,
    location: body.location,
    price: body.price,
    image: body.image
  });

  revalidatePath("/events");
  revalidatePath("/");

  return Response.json(event);
}