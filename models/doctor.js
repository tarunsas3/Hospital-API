const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  {
    timestamps: true,
  }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

doctorSchema.methods.isValidPassword = async function (userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.password);
};
module.exports = mongoose.model("Doctor", doctorSchema);
