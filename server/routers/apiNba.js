const express = require("express");
const nbaController = require('../controllers/apiNba');
const md_auth = require("../middleware/authenicated");
const multipart = require("connect-multiparty");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" })

const api = express.Router();

api.get("/get-teamsApi/:season", nbaController.getTeam);
api.get("/get-teams", nbaController.getTeamsDB);
api.put("/upload-logo/:id",[md_auth.ensureAuth, md_upload_avatar], nbaController.uploadLogo);
api.put("/update-team/:id", [md_auth.ensureAuth], nbaController.updateTeam);
api.get("/get-logo/:avatarName", nbaController.getAvatar);
api.get("/get-players",nbaController.getPlayers);
api.get("/get-players-team", nbaController.getPlayersTeams);
api.get("/get-player-info", nbaController.getPlayersInfo);
api.get("/get-players-state", nbaController.getPlayersState);
api.get("/get-league-leaders", nbaController.getLeagueLeaders);
api.get("/get-scoreboard/:gameDate",nbaController.getScores);
api.get("/get-boxscore",nbaController.getBoxScore);
api.get("/get-player-profile",nbaController.getPlayerProfile);
api.get("/get-playByPlay",nbaController.getplayByPlay);




module.exports = api;