// path : The path module provides utilities for working with file and directory paths. It can be accessed using:
const path = require("path");
// express : Fast, unopinionated, minimalist web framework for node.
const express = require("express");
// body-parser : Node.js body parsing middleware. for parsing incoming request bodies in a middleware
// before your handlers, available under the req.body property.
const bodyParser = require("body-parser");

// mongoose : Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require("mongoose");

// multer is used for parsing form data, especially file uploads and image uploads..
const multer = require("multer");

// Routes is used for routing the request to the specific controller
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

// multer.diskStorage() creates a storage space for storing files. It takes two parameters, destination and filename.
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "records/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      (new Date().toISOString() + "-" + file.originalname).replace(/:/g, "-")
    );
  },
});

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     const fileNameArr = file.originalname.split('.');
//     cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
//   },
// });

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "audio/mp3" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/ogg" ||
    file.mimetype === "audio/midi" ||
    file.mimetype === "audio/x-m4a" ||
    file.mimetype === "audio/x-ms-wma" ||
    file.mimetype === "audio/x-wav" ||
    file.mimetype === "audio/x-matroska" ||
    file.mimetype === "audio/x-aiff" ||
    file.mimetype === "audio/x-flac"
  ) {
    cb(null, true);
  } else {
    cb(null, true);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
// );
app.use(
  multer({ storage: fileStorage }).fields([
    { name: "avatar", maxCount: 1 },
    { name: "record", maxCount: 1 },
  ])
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

global.onlineUsers = new Map();
mongoose
  .connect("mongodb://localhost:27017")
  .then((result) => {
    const server = app.listen(8080);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected", socket.id);
      global.chatSocket = socket;
      // socket.emit("connect", {
      //   message: "data.message",
      // });
      socket.on("add-user", (userId) => {
        console.log("userId", userId);
        onlineUsers.set(userId, socket.id);
      });
      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        console.log("send message", data.message);
        console.log("userId", data.to);
        console.log("sendUserSocket", sendUserSocket);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("messageChannel", {
            message: data.message,
          });
        }
      });
      socket.on("typing", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        // console.log("send message", data.message);
        console.log("userId", data.to);
        console.log("sendUserSocket", sendUserSocket);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("typing");
        }
      });
      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
    // io.on("disconnect", () => {
    //   console.log("Client disconnected");
    // });
  })
  .catch((err) => console.log(err));
// global.onlineUsers = new Map();
