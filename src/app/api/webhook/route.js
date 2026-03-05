import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req) {

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    await connectDB();

    await Booking.create({
      eventTitle: session.metadata.title,
      amount: session.metadata.price,
    });

  }

  return new Response("Success", { status: 200 });
}