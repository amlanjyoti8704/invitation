"use client";

import { useState } from "react";

export default function CreateEvent() {

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Event Created!");
  };

  return (
    <div className="max-w-xl mx-auto py-20">

      <h1 className="text-3xl font-bold mb-8">
        Create Event
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          name="title"
          placeholder="Event Title"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <button className="bg-black text-white py-3 rounded">
          Create Event
        </button>

      </form>
    </div>
  );
}