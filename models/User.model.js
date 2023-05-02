const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      lowercase: true,
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      lowercase: true,
      trim: true
    },
    avatar: {
      type: String,
      trim: true,
      default: ''
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    favoriteCountries: [
      {
        ref: 'country',
        type: Schema.Types.ObjectId
      }
    ],
    favoritePosts: [
      {
        ref: 'post',
        type: Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const {
    _id,
    name,
    lastName,
    avatar,
    role,
    email,
    favoriteCountries,
    favoritePosts
  } = this

  const payload = {
    _id,
    name,
    lastName,
    avatar,
    role,
    email,
    favoriteCountries,
    favoritePosts
  }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {

  return bcrypt.compareSync(candidatePassword, this.password)

}

const User = model("user", userSchema);

module.exports = User;
