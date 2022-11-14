const mongoose = require("mongoose");

const UserRegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 
});

const UserRegisterModel = mongoose.model("userregs",UserRegisterSchema );
module.exports = UserRegisterModel;