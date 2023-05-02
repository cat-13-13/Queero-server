const { Schema, model } = require("mongoose");

const voteSchema = new Schema(
  {
    vote: {
      type: String,
      enum: ['up', 'down'],
      required: true,
      trim: true
    },
    owner: {
      ref: 'user',
      type: Schema.Types.ObjectId,
      required: true,
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

const Vote = model("vote", voteSchema);

module.exports = Vote;
