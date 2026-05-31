const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Booking must belong to a user"],
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "packageId is not defined"],
    },
    studioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: [true, "studioId is not defined"],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bookingSchema.pre(/^find/, function() {
  this.populate({
    path: "user packageId",
  });
});

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
