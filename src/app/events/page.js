import EventCard from "@/components/EventCard";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export default async function Events() {

  await connectDB();

  const events = await Event.find();

  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold mb-10">All Events</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event._id.toString()} event={event} />
        ))}
      </div>
    </div>
  );
}