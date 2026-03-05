async function getBookings() {
  const res = await fetch("http://localhost:3000/api/bookings");
  return res.json();
}

export default async function Dashboard() {
  const bookings = await getBookings();

  return (
    <div className="px-10 py-20">

      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      <div className="space-y-4">

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border p-4 rounded-lg"
          >
            <h2 className="font-semibold">
              {booking.eventTitle}
            </h2>

            <p>Amount: ₹{booking.amount}</p>

            <p className="text-gray-500">
              {new Date(booking.createdAt).toDateString()}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}