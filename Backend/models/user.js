const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "I am new!",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  // keys: {
  //   p: {
  //     type: Number,
  //     required: true,
  //   },
  //   q: {
  //     type: Number,
  //     required: true,
  //   },
  //   n: {
  //     type: Number,
  //     required: true,
  //   },
  //   e: {
  //     type: Number,
  //     required: true,
  //   },
  //   d: {
  //     type: Number,
  //     required: true,
  //   },
  // },
  messages: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "messages",
      },
      withUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
