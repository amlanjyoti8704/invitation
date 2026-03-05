"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {

  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    if (!session) return;

    async function fetchBookings() {
      const res = await fetch("/api/bookings");

      if (!res.ok) {
        console.error("Failed to fetch bookings");
        return;
      }

      const data = await res.json();
      setBookings(data);
    }

    fetchBookings();

  }, [session]);

  if (status === "loading") {
    return <div className="p-10">Loading...</div>;
  }

  if (!session) {
    return <div className="p-10">Please login to view tickets.</div>;
  }

  return (
    <div className="px-10 py-20">
      <h1 className="text-3xl font-bold mb-10">
        Your Tickets
      </h1>

      {bookings.length === 0 && (
        <p>No bookings yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-8">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="border rounded-xl p-6 shadow"
          >

            <h2 className="text-xl font-semibold">
              {booking.eventTitle}
            </h2>

            <p className="text-gray-500">
              ₹{booking.amount}
            </p>

            <p className="text-sm mt-2">
              {booking.userEmail}
            </p>

            <img
              src={booking.qrCode}
              alt="QR Ticket"
              className="w-40 mt-4"
            />

          </div>

        ))}

      </div>
    </div>
  );
}