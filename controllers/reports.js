const Report = require("../models/report");

module.exports.status = async (req, res) => {
  try {
    let report = await Report.find({ status: req.params.status })
      .populate({
        path: "patient",
        select: "name city phone",
      })
      .populate({
        path: "doctor",
        select: "name _id",
      });
    if (report && report.length !== 0) {
      return res.status(200).json({
        message: `Reports with status ${req.params.status}`,
        reports: report,
      });
    } else {
      return res.status(402).json({
        message: `No patients with status ${req.params.status}`,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
