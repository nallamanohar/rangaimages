const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword,
);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

// Protect all routes after this middleware
router.use(authController.protect);

// Admin only routes
router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUsers)
  .post(authController.protect, userController.createUser);

router
  .route("/:id")
  .get(authController.restrictTo("admin"), userController.getUser)
  .patch(authController.restrictTo("admin"), userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
