import EventCard from "@/components/EventCard";
// import { events } from "@/app/data/events";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/events");

  return res.json();
}

export default function Events() {
    const events = getEvents();
  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold mb-10">All Events</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}