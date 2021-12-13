const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamsSchema = Schema({
    teamName: String,
    teamId:{
        unique: true,
        type:Number
    } ,
    logo: String,
    conference:String,
    avatar: String
});

module.exports = mongoose.model("team", TeamsSchema);