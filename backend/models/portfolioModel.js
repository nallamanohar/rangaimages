const mongoose = require("mongoose");
const PortfolioImage = require("./portfolioImageModel");

const portfolioSchema = new mongoose.Schema(
  {
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: [true, "studio is required"],
      index: true,
    },
    categories: {
      type: [String],
      default: [],
      validate: {
        validator: (cats) =>
          cats.every((c) => typeof c === "string" && c.trim().length > 0),
        message: "Each category must be a non-empty string",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

portfolioSchema.pre(/^find/, function() {
  this.populate({
    path: "studio",
    select: "firstName lastName email phoneNumber",
  });
});

// One portfolio per studio
portfolioSchema.index({ studio: 1 }, { unique: true });

// Cascade delete portfolio images when a portfolio is removed
portfolioSchema.pre("findOneAndDelete", async function() {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await PortfolioImage.deleteMany({ portfolioId: doc._id });
  }
});

portfolioSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
