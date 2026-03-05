"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold">EventHub</h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Login
      </button>
    </nav>
  );
}