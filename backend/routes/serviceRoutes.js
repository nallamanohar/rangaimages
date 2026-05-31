const express = require("express");
const serviceController = require("./../controllers/serviceController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .post(serviceController.createService)
  .get(serviceController.getService);

router
  .route("/:id")
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router;
