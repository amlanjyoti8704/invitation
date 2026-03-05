import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {

    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: body.title,
            },
            unit_amount: body.price * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      metadata: {
        eventId: String(body.eventId),
        title: body.title,
        price: body.price,
        userEmail: body.userEmail,
      },

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/events",
    });

    return Response.json({ url: session.url });

  } catch (error) {

    console.error("STRIPE ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }
}