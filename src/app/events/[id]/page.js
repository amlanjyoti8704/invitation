"use client";
import { use } from "react";
import Image from "next/image";
// import { events } from "@/app/data/events";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function EventDetails() {

  const { id } = useParams();
  const { data: session } = useSession();
  const [event, setEvent] = useState(null);

  useEffect(() => {

    if (!id) return; 

    async function getEvent() {
      const res = await fetch(`/api/events/${id}`);
      const data = await res.json();
      setEvent(data);
    }

    getEvent();

  }, [id]);

  if (!event) {
    return <h1 className="p-10 text-2xl">Loading event...</h1>;
  }

const handleCheckout = async () => {

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId: event._id,
      title: event.title,
      price: event.price,
      userEmail: session?.user?.email
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Checkout error:", error);
    return;
  }

  const data = await res.json();

  window.location.href = data.url;
};

  return (
    <div className="px-10 py-20">

      {event.image && (
        <Image
          src={event.image}
          width={1200}
          height={400}
          alt={event.title}
          className="w-full h-96 object-cover rounded-xl"
        />
      )}

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