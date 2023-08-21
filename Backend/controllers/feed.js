const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Message = require("../models/message");
const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  // usersData = users.filter(user => {
  //   if(user._id == req.userId){
  //     return false;
  //   }
  //   return true;
  // });
  userData = users.map((user) => {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
  });
  res.status(200).json({ message: "Fetched users successfully.", userData });
};
exports.getPublicKey = async (req, res, next) => {
  console.log(req.body.userId);
  const user = await User.findById(req.body.userId);
  console.log("pp");
  res.status(200).json({
    message: "Fetched users successfully.",
  });
};

// exports.getConversationData = async (req, res, next) => {
//   let conversationData = [];
//   let data = await Message.find({ userId: req.body.userId });
//   if (data.length == 0) {
//     data = await Message.find({ userId: req.body.toId });
//   }
//   if (data.length > 0) {
//     conversationData = data[0].content.map((dataItem) => {
//       return {
//         _id: dataItem._id,
//         me: dataItem.me == req.body.userId ? true : false,
//         body: dataItem.body,
//       };
//     });
//   }
//   res
//     .status(200)
//     .json({ message: "Fetched users successfully.", conversationData });
// };

// exports.createMessage2 = async (req, res, next) => {
//   const user = await User.findById(req.userId);
//   // console.log("toiid", req.body.toId);
//   // mId = null;
//   receiverId = "123";
//   let conversation = await Message.find({ userId: req.userId });
//   if (conversation.length === 0) {
//     conversation = await Message.find({ userId: req.body.toId });
//     if (conversation.length === 0) {
//       mId = req.userId;
//       console.log("conversation", conversation);
//       conversation = new Message({
//         userId: req.userId,
//       });
//       await conversation.save();
//     } else {
//       mId = req.body.toId;
//     }
//   } else {
//     mId = req.userId;
//   }
//   conversation = await Message.find({ userId: mId });
//   console.log("user", user);
//   console.log("req.body", req.body);
//   console.log("conversation", conversation);
//   conversation[0].content.push({ me: req.userId, body: req.body.message });
//   await conversation[0].save();
//   return res.status(201).json({ message: "Message created successfully!" });
// };
exports.getConversationData = async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  const messageId = await user.messages.find((message) => {
    return message.withUserId == req.body.toId;
  });
  if (messageId) {
    const conversation = await Message.findById(messageId.id);
    conversationData = conversation.content.map((dataItem) => {
      return {
        _id: dataItem._id,
        me: dataItem.typedBy == req.body.userId ? true : false,
        body: dataItem.body,
        type: dataItem.type,
      };
    });
    res
      .status(200)
      .json({ message: "Fetched users successfully.", conversationData });
  } else {
    res
      .status(200)
      .json({ message: "Fetched users successfully.", conversationData: [] });
  }
};
exports.createMessage = async (req, res, next) => {
  console.log("req.body", req.body);
  const user = await User.findById(req.body.userId);
  const messageId = await user.messages.find((message) => {
    return message.withUserId == req.body.toId;
  });
  // check if message already exists
  if (messageId) {
    console.log("messageId", messageId.id);
    const conversation = await Message.findById(messageId.id);
    console.log("conversation", conversation._id);
    conversation.content.push({
      typedBy: req.body.userId,
      body: req.body.message,
      time: Date.now(),
      date: Date.now(),
      status: "1",
    });
    await conversation.save();
    return res.status(201).json({ message: "Message pushed successfully!" });
  } else {
    let messageBody = "";
    if (req.body.type == "record") {
      if (!req.files || !req.files.record) {
        return res.status(400).json({
          error: "record is required",
        });
      } else {
        messageBody = req.files.record[0].path;
      }
    } else {
      messageBody = req.body.message;
    }
    const conversation = new Message({
      content: [
        {
          typedBy: req.body.userId,
          body: messageBody,
          time: Date.now(),
          date: Date.now(),
          status: "1",
        },
      ],
    });
    await conversation.save();
    user.messages.push({
      id: conversation._id,
      withUserId: req.body.toId,
    });
    const userTo = await User.findById(req.body.toId);
    userTo.messages.push({
      id: conversation._id,
      withUserId: req.body.userId,
    });
    await userTo.save();
    await user.save();
    return res.status(201).json({ message: "Message created successfully!" });
  }
};

exports.record = async (req, res, next) => {
  if (!req.files || !req.files.record) {
    return res.status(400).json({
      error: "record is required",
    });
  } else {
    const user = User.findById(req.userId);
    console.log(req.files.record[0].path);
  }
};

////////////// ///// /////////
