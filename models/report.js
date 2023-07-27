const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reportSchema = new mongoose.Schema(
  {
    doctor: {
      type: ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: ObjectId,
      ref: "Patient",
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
