const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchame = Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String
});

module.exports = mongoose.model("user", UserSchame);