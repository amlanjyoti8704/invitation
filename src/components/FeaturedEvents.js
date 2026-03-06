import EventCard from "./EventCard";
// import { events } from "@/app/data/events";
import { use } from "react";


export default function FeaturedEvents() {

  async function getEvents() {
    const res = await fetch("http://localhost:3000/api/events");
    const data = await res.json();
    return data;
  }
  const events = use(getEvents());
  return (
    <section className="px-10 py-20">

      <h2 className="text-3xl font-bold mb-10 text-center">
        Featured Events
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

    </section>
  );
}