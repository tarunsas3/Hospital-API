const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.register = async (req, res) => {
  try {
    let patient = await Patient.findOne({ phone: req.body.phone });
    if (!patient) {
      let patient = await Patient.create(req.body);
      return res.status(200).json({
        message: "Registration successful",
        patientId: patient._id,
        name: patient.name,
      });
    } else {
      return res.status(402).json({
        message: "Internal Server Error : Patient already registered",
        patientId: patient._id,
        name: patient.name,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);
    if (patient) {
      let reportData = {
        doctor: req.body.doctor,
        patient: req.params.id,
        status: req.body.status,
        date: req.body.date,
      };
      let report = await Report.create(reportData);
      patient.reports.push(report);
      patient.save();

      return res.status(200).json({
        message: "Report creation successful",
      });
    } else {
      return res.status(402).json({
        message: "Registration unsuccessful",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

module.exports.allReports = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id).populate({
      path: "reports",
      populate: { path: "doctor", select: "name _id" },
    });

    if (patient) {
      return res.status(200).json({
        message: `Reports of ${patient.name}`,
        reports: patient.reports,
      });
    } else {
      return res.status(402).json({
        message: "Internal Server Error : Patient not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
