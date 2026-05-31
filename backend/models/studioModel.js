const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Studio must belong to a User!"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [100, "First name cannot exceed 100 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [100, "Last name cannot exceed 100 characters"],
    },
    tagline: {
      type: String,
      required: [true, "Tagline is required"],
      trim: true,
      maxlength: [200, "Tagline cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    navItems: {
      type: [String],
      default: [],
      validate: {
        validator: (items) => items.length <= 10,
        message: "navItems cannot have more than 10 entries",
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[\d\s\-().]{7,20}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    imageCover: {
      type: String,
      // required: [true, "A Studio must have a cover image"],
    },
    profileImage1: {
      type: String,
      // required: [true, "A Studio must have a cover image"],
    },
    profileImage2: {
      type: String,
      // required: [true, "A Studio must have a cover image"],
    },
    hours: {
      type: String,
      required: [true, "Business hours are required"],
      trim: true,
    },
    instaUrl: {
      type: String,
      trim: true,
      default: null,
    },
    facebookUrl: {
      type: String,
      trim: true,
      default: null,
    },
    youtubeUrl: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

studioSchema.pre(/^find/, function() {
  this.populate({
    path: "user",
    select: "name email phoneNumber",
  });
});

// Virtual: full name
studioSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Remove __v from JSON responses
studioSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Studio", studioSchema);
