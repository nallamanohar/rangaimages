const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: [true, "Studio is required"],
      index: true,
    },
    serviceName: {
      type: String,
      required: [true, "serviceName is required"],
      trim: true,
      maxlength: [150, "serviceName cannot exceed 150 characters"],
    },
    serviceDescription: {
      type: String,
      required: [true, "serviceDescription is required"],
      trim: true,
      maxlength: [3000, "serviceDescription cannot exceed 3000 characters"],
    },
    serviceHighlights: {
      type: [String],
      default: [],
      validate: {
        validator: (highlights) => highlights.length <= 20,
        message: "serviceHighlights cannot have more than 20 entries",
      },
    },
    servicePrice: {
      type: String,
      required: [true, "servicePrice is required"],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

serviceSchema.pre(/^find/, function() {
  this.populate({
    path: "studio",
    select: "firstName lastName email phoneNumber -user",
  });
});

// Featured services first for a studio
serviceSchema.index({ studio: 1, isFeatured: -1 });
// Unique service name per studio (case-insensitive)
serviceSchema.index(
  { studio: 1, serviceName: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } },
);

serviceSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Service", serviceSchema);
