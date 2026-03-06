"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function VerifyTicket() {

  const [ticket, setTicket] = useState(null);

  const handleScan = async (result) => {

    if (!result) return;

    const qrData = result[0].rawValue;

    const res = await fetch("/api/verify-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ qrData })
    });

    const data = await res.json();

    setTicket(data);
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Verify Ticket
      </h1>

      <div className="w-96">
        <Scanner onScan={handleScan} />
      </div>

        {ticket && (

        <div className="mt-6 p-6 border rounded-xl">

            {ticket.status === "valid" && (
            <div className="text-green-600">
                <h2 className="text-xl font-semibold">Ticket Valid ✅</h2>
                <p>Event: {ticket.eventTitle}</p>
                <p>User: {ticket.userEmail}</p>
            </div>
            )}

            {ticket.status === "already_used" && (
            <p className="text-yellow-600">
                Ticket Already Used ⚠️
            </p>
            )}

            {ticket.status === "invalid" && (
            <p className="text-red-600">
                Invalid Ticket ❌
            </p>
            )}

        </div>

        )}

    </div>
  );
}