const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    content: [
      {
        typedBy: {
          type: String,
          required: false,
        },
        body: {
          type: String,
          required: false,
        },
        time: {
          type: Date,
          required: false,
        },
        date: {
          type: Date,
          required: false,
        },
        status: {
          // "1" sent, "2" delivered, "3" read
          type: String,
          required: false,
        },
        type: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("messages", messageSchema);
