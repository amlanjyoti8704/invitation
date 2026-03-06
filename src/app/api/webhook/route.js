import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import QRCode from "qrcode";
import { sendTicketEmail } from "@/lib/sendEmail";

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

    const qrData = JSON.stringify({
      eventId: session.metadata.eventId,
      eventTitle: session.metadata.title,
      email: session.metadata.userEmail,
      paymentIntent: session.payment_intent
    });

    const qrCode = await QRCode.toDataURL(qrData);

    await Booking.create({
      eventId: session.metadata.eventId,
      eventTitle: session.metadata.title,
      userEmail: session.metadata.userEmail,
      amount: session.metadata.price,
      paymentIntentId: session.payment_intent,
      qrCode: qrCode
    });

    await sendTicketEmail(
      session.metadata.userEmail,
      session.metadata.title,
      qrCode
    );

  }

  return new Response("Success", { status: 200 });
}