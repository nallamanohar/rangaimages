const express = require("express");
const studioController = require("./../controllers/studioController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .post(studioController.createStudio)
  .get(studioController.getStudio);

router.route("/:id").patch(studioController.updateStudio);

module.exports = router;
