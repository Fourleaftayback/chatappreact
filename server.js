const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT;
const db = process.env.MLAB || "mongodb://localhost/test";
const app = express();

const authApi = require("./routes/auth");
const resetApi = require("./routes/reset");
const userListApi = require("./routes/userList");

require("./config/passportUser")(passport);

mongoose.connect(db, {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(busboy());
app.use(busboyBodyParser());

app.use("/user", authApi);
app.use("/reset", resetApi);
app.use("/list", userListApi)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build", {
    maxAge: "7d"
  }));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
}

app.listen(port, () => console.log(`server connected on ${port}`));