const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      ref: 'user',
      type: Schema.Types.ObjectId
    },
    type: {
      type: String,
      enum: ['POST', 'COUNTRY']
    }
  },
  {
    timestamps: true
  }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
