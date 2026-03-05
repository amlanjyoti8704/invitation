"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    }

    fetchBookings();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Your Tickets</h1>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border p-4 rounded-lg mb-4"
        >
          <h2 className="text-xl font-semibold">
            {booking.eventTitle}
          </h2>

          <p>Price: ₹{booking.amount}</p>
          <p>Email: {booking.userEmail}</p>
        </div>
      ))}
    </div>
  );
}