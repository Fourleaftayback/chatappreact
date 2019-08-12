const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const socketIo = require("socket.io");
const compression = require("compression");
const helmet = require("helmet");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT;
const db = process.env.MLAB || "mongodb://localhost/test";

const app = express();
app.use(compression());

const server = http.createServer(app);
const io = socketIo(server);

const authApi = require("./routes/auth");
const resetApi = require("./routes/reset");
const userListApi = require("./routes/userList");
const messageApi = require("./routes/messages");
require("./config/passportUser")(passport);

mongoose.connect(db, {
  useNewUrlParser: true
});

//add helmet here

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(busboy());
app.use(busboyBodyParser());

app.use("/user", authApi);
app.use("/reset", resetApi);
app.use("/list", userListApi);
app.use("/messages", messageApi);

require("./routes/socket")(io);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static("client/build", {
      maxAge: "7d"
    })
  );
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
}

server.listen(port, () => console.log(`server running on ${port}`));
