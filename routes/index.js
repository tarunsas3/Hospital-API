const express = require("express");
const router = express.Router();
const passport = require("passport");

const Doctor = require("../controllers/doctors");
const Patient = require("../controllers/patients");
const Report = require("../controllers/reports");

const PatientData = require("../models/patient");

router.post("/doctors/register", Doctor.register);
router.post("/doctors/login", Doctor.login);
router.post(
  "/patients/register",
  passport.authenticate("jwt", { session: false }),
  Patient.register
);
router.post(
  "/patients/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  Patient.createReport
);
router.get(
  "/patients/:id/all_reports",
  passport.authenticate("jwt", { session: false }),
  Patient.allReports
);
router.get(
  "/reports/:status",
  passport.authenticate("jwt", { session: false }),
  Report.status
);

module.exports = router;
