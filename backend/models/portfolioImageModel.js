const mongoose = require("mongoose");

const portfolioImageSchema = new mongoose.Schema(
  {
    studioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: [true, "studioId is required"],
      index: true,
    },
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: [true, "portfolioId is required"],
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, "imageUrl is required"],
      trim: true,
      validate: {
        validator: (url) => /^https?:\/\/.+\..+/.test(url),
        message: "imageUrl must be a valid URL",
      },
    },
    imageCategory: {
      type: String,
      required: [true, "imageCategory is required"],
      trim: true,
    },
    imageName: {
      type: String,
      required: [true, "imageName is required"],
      trim: true,
      maxlength: [200, "imageName cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Filter images by portfolio + category (gallery view)
portfolioImageSchema.index({ portfolioId: 1, imageCategory: 1 });
// All images for a studio sorted by newest
portfolioImageSchema.index({ studioId: 1, createdAt: -1 });

portfolioImageSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("PortfolioImage", portfolioImageSchema);
