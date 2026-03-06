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

          {ticket.error ? (
            <p className="text-red-500">
              Invalid Ticket ❌
            </p>
          ) : (
            <>
              <p className="text-green-600 font-semibold">
                Ticket Valid ✅
              </p>

              <p>Event: {ticket.eventTitle}</p>
              <p>User: {ticket.userEmail}</p>
            </>
          )}

        </div>

      )}

    </div>
  );
}