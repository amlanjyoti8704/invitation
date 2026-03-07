import Link from "next/link";

export default function Hero() {
  
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 bg-gray-500">
      
      <h1 className="text-5xl font-bold mb-6 text-gray-800">
        Plan Your Perfect Event
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Discover and book amazing events around you.
      </p>

      <Link href="/events">
        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Explore Events
        </button>
      </Link>

    </section>
  );
}