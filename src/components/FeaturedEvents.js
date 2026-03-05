import EventCard from "./EventCard";
import { events } from "@/app/data/events";

export default function FeaturedEvents() {
  return (
    <section className="px-10 py-20">

      <h2 className="text-3xl font-bold mb-10 text-center">
        Featured Events
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </section>
  );
}