const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please tell us your name!"],
    },

    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number!"],
      unique: true,
      validate: {
        validator: function(el) {
          // Indian phone number validation
          return /^[6-9]\d{9}$/.test(el);
        },
        message: "Please provide a valid 10-digit Indian phone number!",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "photographer"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    photo: {
      type: String,
      default: null,
    },
    avatarPublicId: {
      type: String,
      default: null,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    // Email verification
    isVerified: { type: Boolean, default: false },
    verificationOTP: { type: String, select: false },
    verificationOTPExpires: { type: Date, select: false },

    // Password reset
    passwordResetOTP: { type: String, select: false },
    passwordResetOTPExpires: { type: Date, select: false },

    // Account status
    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    // Photographer-specific: force password change on first login
    mustChangePassword: { type: Boolean, default: false },

    // Notification preferences
    notificationPreferences: {
      email: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
    },

    lastLoginAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });

userSchema.pre("save", function() {
  if (!this.isModified("password") || this.isNew) return;
  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.pre("save", async function() {
  // only run this function if password was actually modifies
  if (!this.isModified("password")) return;

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm field
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre(/^find/, function() {
  // this points to the current query
  this.find({ active: { $ne: false } });
});

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
  return { otp, hashedOTP };
};

userSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    avatarUrl: this.avatarUrl,
    phone: this.phone,
    isVerified: this.isVerified,
    isActive: this.isActive,
    notificationPreferences: this.notificationPreferences,
    createdAt: this.createdAt,
  };
};

const User = mongoose.model("User", userSchema);

module.exports = User;
