const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minLength: 4 },
  email: { type: String, required: true, unique: true },
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
