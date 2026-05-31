const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD,
  );

  mongoose
    .connect(DB)
    .then(() => console.log("DB connection successful🔥🔥🔥🔥🔥!"));
};
module.exports = connectDB;
