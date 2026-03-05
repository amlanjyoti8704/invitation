"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md">

      <h1 className="text-2xl font-bold">EventHub</h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>

        {session && (
          <Link href="/dashboard">Dashboard</Link>
        )}
      </div>

      {session ? (
        <div className="flex items-center gap-4">
          <p className="text-sm">
            {session.user.name}
          </p>

          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </button>
      )}

    </nav>
  );
}