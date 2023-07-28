const express = require("express");
const passport = require("passport");
const passportJWT = require("./config/passport");
const port = 3000;

require("./config/mongoose").connect();

const app = express();
app.use(express.urlencoded());
app.use(passport.initialize());
app.use("/", require("./routes"));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Hospital API",
    about:
      "An Application Programming Interface (API) allows a computer to fetch data from another computer",
    createdBy: "Tarun",
    launched: 2023,
    version: 1,
  });
});

app.listen(port, () => {
  console.log(`Successfully Listening at port ${port}`);
});
