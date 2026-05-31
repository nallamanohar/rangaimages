const mongoose = require("mongoose");

const contactSubmissionSchema = new mongoose.Schema(
  {
    studioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: [true, "studioId is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: [200, "name cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
      trim: true,
      match: [/^\+?[\d\s\-().]{7,20}$/, "Please provide a valid phone number"],
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },
    preferredDate: {
      type: Date,
      required: [true, "preferredDate is required"],
      validate: {
        validator: (date) => date >= new Date(),
        message: "preferredDate must be a future date",
      },
    },
    message: {
      type: String,
      required: [true, "message is required"],
      trim: true,
      maxlength: [2000, "message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "re-contact", "declined"],
      default: "new",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

contactSubmissionSchema.pre(/^find/, function() {
  this.populate({
    path: "studioId packageId",
    select: "name email phoneNumber serviceName",
  });
});

// Studio inbox sorted newest first
contactSubmissionSchema.index({ studioId: 1, createdAt: -1 });

contactSubmissionSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("ContactSubmission", contactSubmissionSchema);
