const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });
    if (!doctor) {
      await Doctor.create(req.body);
      return res.status(200).json({
        message: "Registration successful",
      });
    } else {
      return res.status(402).json({
        message: "Internal Server Error : Username already exists",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });
    if (!doctor) {
      return res.status(402).json({
        message: "Bad Credentials",
      });
    }
    let isValid = await doctor.isValidPassword(req.body.password);
    if (!isValid) {
      return res.status(402).json({
        message: "Bad Credentials",
      });
    }

    return res.status(200).json({
      message: "Authentication successful",
      auth: {
        token: jwt.sign(doctor.toJSON(), "NINJA", {
          expiresIn: "24h",
        }),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
