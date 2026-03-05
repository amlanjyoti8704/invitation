
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  eventId: String,
  eventTitle: String,
  userEmail: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
  
