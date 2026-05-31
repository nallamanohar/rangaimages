const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const studioRouter = require("./routes/studioRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const contactRouter = require("./routes/contactSubmissionRoutes");
const portfolioRouter = require("./routes/portfolioRoutes");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limits the number of requests from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/studio", studioRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/portfolio", portfolioRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
