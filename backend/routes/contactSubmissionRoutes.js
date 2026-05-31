const express = require("express");
const contactSubmissionController = require("./../controllers/contactSubmissionController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .post(contactSubmissionController.createContactSubmission)
  .get(contactSubmissionController.getcontactSubmission);

router
  .route("/:id")
  .patch(contactSubmissionController.updatecontactSubmission)
  .delete(contactSubmissionController.deletecontactSubmission);

module.exports = router;
