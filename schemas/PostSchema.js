const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      pinned: Boolean,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);