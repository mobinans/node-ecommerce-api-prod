const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [50, "Must be maximum 50, got {VALUE}"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} !!! Please provide valid email",
    },
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    min: [6, "Must be at least 6, got {VALUE}"],
  },

  role: {
    type: String,
    enum: { values: ["admin", "user"], message: "{VALUE} is not allowed" },
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("Password"));
  if (!this.isModified("Password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatched = await bcrypt.compare(candidatePassword, this.password);
  return isMatched;
};

module.exports = mongoose.model("User", UserSchema);
