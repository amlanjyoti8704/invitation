import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  date: Date,
  location: String,
  image: String,
});

export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema);