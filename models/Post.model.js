const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      lowercase: true,
      trim: true
    },
    postImg: {
      type: String,
      trim: true,
      default: ''
    },
    owner: {
      ref: 'user',
      type: Schema.Types.ObjectId,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true
    },
    country: {
      ref: 'country',
      type: Schema.Types.ObjectId,
      required: true,
    },
    comments: [{
      ref: 'comment',
      type: Schema.Types.ObjectId
    }],
    votes: [{
      ref: 'vote',
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
);

const Post = model("post", postSchema);

module.exports = Post;
