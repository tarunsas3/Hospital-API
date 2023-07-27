const express = require("express");
const passport = require("passport");
const passportJWT = require("./config/passport");
const port = 3000;

require("./config/mongoose").connect();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/", require("./routes"));

app.get("/", (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log(`Successfully Listening at port ${port}`);
});
