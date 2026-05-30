const express = require("express");

const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post("/", bookingController.createBooking);
router.get("/myBookings", bookingController.getMyBookings);
router.get(
  "/",
  authController.restrictTo("admin"),
  bookingController.getAllBookings,
);
router.get(
  "/:id",
  authController.restrictTo("admin"),
  bookingController.getBooking,
);

router.patch(
  "/:id",
  authController.restrictTo("admin"),
  bookingController.updateBooking,
);

router.delete(
  "/:id",
  authController.restrictTo("admin"),
  bookingController.deleteBooking,
);

module.exports = router;
