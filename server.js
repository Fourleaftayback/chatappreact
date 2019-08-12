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
app.use(helmet.dnsPrefetchControl());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.xssFilter());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "maxcdn.bootstrapcdn.com",
        "use.fontawesome.com",
        "stackpath.bootstrapcdn.com",
        "kit-free.fontawesome.com"
      ],
      fontSrc: [
        "'self'",
        "use.fontawesome.com",
        "maxcdn.bootstrapcdn.com",
        "kit-free.fontawesome.com"
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "code.jquery.com",
        "cdnjs.cloudflare.com",
        "stackpath.bootstrapcdn.com",
        "storage.googleapis.com",
        "use.fontawesome.com",
        "kit.fontawesome.com",
        "connect.facebook.net"
      ],
      imgSrc: [
        "'self'",
        "chatappreact.s3.amazonaws.com",
        "platform-lookaside.fbsbx.com",
        "http://www.w3.org/2000/svg",
        "data:"
      ],
      frameSrc: [
        "'self'",
        "staticxx.facebook.com",
        "facebook.com",
        "https://www.facebook.com"
      ],
      connectSrc: ["'self'", "facebook.com", "https://www.facebook.com"]
    }
  })
);

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
