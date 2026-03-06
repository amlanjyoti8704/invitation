"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {

  const { data: session } = useSession();

  const [events, setEvents] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: ""
  });

  async function loadEvents() {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  if (!session || session.user.role !== "admin") {
    return <div className="p-10">Access Denied</div>;
  }

  async function createEvent(e) {

    e.preventDefault();

    if (!form.image) {
        alert("Please upload an image first");
        return;
    }

    await fetch("/api/admin/events", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    });

    setForm({
        title: "",
        description: "",
        location: "",
        price: "",
        image: ""
    });

    loadEvents();
  }

  async function deleteEvent(id) {

    await fetch(`/api/admin/events/${id}`, {
      method: "DELETE"
    });

    loadEvents();
  }

 async function handleImageUpload(e) {

    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {

        const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image: reader.result
        })
        });

        const data = await res.json();

        setForm((prev) => ({
        ...prev,
        image: data.url
        }));

        setUploading(false);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Create Event Form */}

      <form
        onSubmit={createEvent}
        className="space-y-4 mb-10"
      >

        <input
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})}
        />

        <input
          placeholder="Location"
          className="border p-2 w-full"
          value={form.location}
          onChange={(e)=>setForm({...form,location:e.target.value})}
        />

        <input
          placeholder="Price"
          className="border p-2 w-full"
          value={form.price}
          onChange={(e)=>setForm({...form,price:e.target.value})}
        />

        <input
            type="file"
            className="border p-2 w-full"
            onChange={handleImageUpload}
        />

        {form.image && (
            <img
                src={form.image}
                className="w-40 mt-3 rounded"
            />
        )}

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e)=>setForm({...form,description:e.target.value})}
        />

        <button
            disabled={uploading}
            className="bg-slate-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
            {uploading ? "Uploading Image..." : "Create Event"}
        </button>

      </form>

      {/* Event List */}

      <div className="space-y-4">

        {events.map(event => (

          <div
            key={event._id}
            className="border p-4 flex justify-between"
          >

            <div>
              <h2 className="font-semibold">{event.title}</h2>
              <p>{event.location}</p>
            </div>

            <button
              onClick={()=>deleteEvent(event._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}