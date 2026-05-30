const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Booking must belong to a user"],
    },

    eventType: {
      type: String,
      required: [true, "Please select an event type"],
      enum: ["Wedding", "PreWedding", "Birthday", "Other"],
    },

    eventDate: {
      type: Date,
      required: [true, "Please provide event date"],
    },

    location: {
      type: String,
      required: [true, "Please provide event location"],
    },

    package: {
      type: String,
      required: [true, "Please select a package"],
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index(
  {
    user: 1,
    eventType: 1,
    eventDate: 1,
  },
  {
    unique: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
