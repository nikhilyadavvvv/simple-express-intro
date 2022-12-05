const express = require("express");
var cors = require('cors')
const port = process.env.PORT || 3000;
const app = express();
const server = require("http").createServer(app);
app.use(cors());
app.use(require("body-parser").urlencoded({ extended: false }));
var otpObject = {
  address: "",
  message: "",
};

var whitelist = ["EXAMPLE@gmail.com-EXPSW1234%"];

app.get("/", (req, res) => res.send("Hello World from OTP Store!"));

app.post("/otp", function (req, res) {
  var email = req.body.email;
  if (whitelist.includes(email)) {
    res.json(otpObject);
  } else {
    res.json({
      address: "SOME RANDOM ADDRESS",
      message: "INVALID EMAIL OR PASSWORD",
    });
  }
});

app.post("/", function (req, res) {
  otpObject.address = req.body.address;
  otpObject.message = req.body.message;
  res.json(otpObject);
});

server.listen(port, () => console.log(`Lisening on port :${port}`));
