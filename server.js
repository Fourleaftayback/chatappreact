const express = require("express");
const http = require("http");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const socketIO = require("socket.io");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT;
const db = process.env.MLAB || "mongodb://localhost/test";
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

const authApi = require("./routes/auth");
const resetApi = require("./routes/reset");
const userListApi = require("./routes/userList");

require("./config/passportUser")(passport);

mongoose.connect(db, {
  useNewUrlParser: true
});

app.use(cors);

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

io.on("connection", socket => {
  console.log("New client connected");

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on("change color", color => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log("Color Changed to: ", color);
    io.sockets.emit("change color", color);
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//app.listen(port, () => console.log(`server connected on ${port}`));
server.listen(port, () => console.log(port));
