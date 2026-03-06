import EventCard from "./EventCard";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const revalidate = 5;

export default async function FeaturedEvents() {

  await connectDB();

  const events = await Event.find();

  return (
    <section className="px-10 py-20">

      <h2 className="text-3xl font-bold mb-10 text-center">
        Featured Events
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event._id.toString()} event={event} />
        ))}
      </div>

    </section>
  );
}