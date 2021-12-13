const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatsSchema = Schema({
    playerId:{
        unique: true,
        type:Number
    },
    pts:Number,
    ast: String,
    reb:String,
    pie:String
});

module.exports = mongoose.model("player", PlayersSchema);