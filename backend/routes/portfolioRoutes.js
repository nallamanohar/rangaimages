const express = require("express");
const portfolioController = require("./../controllers/portfolioController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .post(portfolioController.createPortfolio)
  .get(portfolioController.getPortfolio);

router
  .route("/:id")
  .patch(portfolioController.updatePortfolio)
  .delete(portfolioController.deletePortfolio);

module.exports = router;
