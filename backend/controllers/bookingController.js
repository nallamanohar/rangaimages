const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerController");

exports.createBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.create({
    user: req.user.id,
    eventType: req.body.eventType,
    eventDate: req.body.eventDate,
    location: req.body.location,
    package: req.body.package,
    description: req.body.description,
  });

  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user.id,
  });

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

const popOptions = {
  path: "user",
  select: "name email phoneNumber -_id",
};

exports.getAllBookings = factory.getAll(Booking, popOptions);
exports.getBooking = factory.getOne(Booking, popOptions);

exports.deleteBooking = factory.deleteOne(Booking);

exports.updateBooking = factory.updateOne(Booking);
