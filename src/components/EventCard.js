import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition">

        <img
          src={event.image}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-semibold">
            {event.title}
          </h2>

          <p className="text-gray-500">
            {event.location}
          </p>

          <p className="font-bold text-blue-600">
            ₹{event.price}
          </p>
        </div>

      </div>
    </Link>
  );
}