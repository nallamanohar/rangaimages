const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post("/", bookingController.createBooking);
router.get("/myBookings", bookingController.getMyBookings);

router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

router.use(authController.restrictTo("admin"));
router.route("/").get(bookingController.getAllBookings);

module.exports = router;
