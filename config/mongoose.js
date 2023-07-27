const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(
      "mongodb+srv://Tarun:jozRAyNcE8ai5dm2@cluster0.ey74rnu.mongodb.net/data"
    )
    .then(console.log("successfully connected to MongoDB"))
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};
