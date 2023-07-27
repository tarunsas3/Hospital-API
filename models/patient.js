const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patient = (module.exports = mongoose.model("Patient", patientSchema));
