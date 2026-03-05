"use client";
import { use } from "react";
import Image from "next/image";
import { events } from "@/app/data/events";

export default  function EventDetails({ params }) {

  const { id } = use(params);

  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    console.log("Event not found for id:", id);
    return <h1 className="p-10 text-2xl">Event not found</h1>;
  }

  const handleCheckout = async () => {

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.title,
        price: event.price,
      }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div className="px-10 py-20">

      <Image
        src={event.image}
        width={1200}
        height={400}
        alt={event.title}
        className="w-full h-96 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-6">
        {event.title}
      </h1>

      <p className="text-gray-500 mt-2">
        {event.location}
      </p>

      <p className="text-xl font-semibold mt-4">
        ₹{event.price}
      </p>

      <p className="mt-6 text-gray-700">
        {event.description}
      </p>

      <button
        onClick={handleCheckout}
        className="mt-8 bg-slate-600 text-white px-6 py-3 rounded-lg"
      >
        Book Ticket
      </button>

    </div>
  );
}