const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayersSchema = Schema({
    playerId:{
        unique: true,
        type:Number
    },
    teamId:Number,
    firstName: String,
    lastName:String,
});

module.exports = mongoose.model("player", PlayersSchema);