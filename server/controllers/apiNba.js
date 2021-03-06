//const nba = require('nba-api-client');
const nba = require("nba");
const Team = require("../models/teams");
const Player = require("../models/players");
const fs = require("fs");
const path = require("path");
const {players} = require("../data/players");

function getTeam(req, res) {
    const season = req.params.season;

    async function asignoConferencia(teamId,e){
        return new Promise( (resolve, reject) => {
            Team.findOne({ teamId }, (err, teamStored) => {
                if(err){
                     reject(err);
                }else{
                    e.conference= teamStored.conference;
                    e.avatar=teamStored.avatar;
                     resolve(e);
                }
            }); 
        });
 
    }

    function recorroRespuestaApi(teams){
        return  new Promise( async (resolve, reject) => {
            let promesas = [];
            let cant = 1;
            let r = await teams.forEach(async e => {         
                const teamId = e.teamId;
                await asignoConferencia(teamId,e);
                //console.log('2');
                promesas.push(e);
                if(cant>29){
                    console.log(cant);
                    return resolve(promesas);
                }else{
                    cant++;
                }
            });
            r.then(e=>{
                resolve(promesas);
            })

        });
    }

    nba.stats.teamStats({Season:season}).then(async teams=>{
        if (!teams) {
            res.status(404).send({ message: "No se ha encontrado ningun equipo." });
        } else {
            recorroRespuestaApi(teams).then(r=>{
                console.log('4');
                res.status(200).send(r);
            });
        }
    });
}

function getPlayers(req,res){
    players.forEach(e=>{
        const player = new Player();
        player.playerId = e.playerId
        player.teamId = e.teamId
        player.firstName = e.firstName
        player.lastName = e.lastName
        player.save((err, playerStored) => {
            if (err) {
                res.status(500).send({ message: "Error el jugador ya existe" });
            } else {
                if (!playerStored) {
                    res.status(404).send({ message: "Error al crear el jugador" })
                }
            }
        });
    })
    res.status(200).send(players);            
}

function getTeamsDB(req, res) {
    Team.find()
        .sort({ ordinal: "asc" })
        .exec((err, teamStored) => {
            if (err) {
                res.status(404).send({ message: "Error en el server" })
            } else {
                if (!teamStored) {
                    res.status(500).send({ message: "No existen equipos" })
                } else {
                    res.status(200).send({ teams: teamStored })
                }
            }
        })
}

function uploadLogo(req, res) {
    const params = req.params;
    console.log('qqq'+params);
    Team.findById({ _id: params.id }, (err, teamData) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!teamData) {
                res.status(404).send({ message: "No se ha encontrado ningun equipo" });
            } else {
                let team = teamData;
                if (req.files) {
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split("\\");
                    console.log(fileSplit);
                    let fileName = fileSplit[2];
                    console.log(fileName);
                    let extSplit = fileName.split(".");
                    console.log(extSplit);
                    let fileExt = extSplit[1];


                    if (fileExt !== "png" && fileExt !== "jpg") {
                        res.status(400)
                            .send({
                                message: "La extensi??n de la imagen no es v??lida"
                            });
                    } else {
                        team.avatar = fileName;
                        Team.findByIdAndUpdate({ _id: params.id },
                            team, (err, teamResult) => {
                                if (err) {
                                    res.status(500).send({
                                        message: "Error del servidor"
                                    })
                                } else {
                                    if (!teamResult) {
                                        res.status(404).send({
                                            message: "No se ha encontrado ningun equipo"
                                        });
                                    } else {
                                        res.status(200).send({ avatarName: fileName });
                                    }
                                }
                            });
                    }


                }
            }
        }
    })

}

function updateTeam(req, res) {

    let teamData = req.body;
    const params = req.params;
    Team.findByIdAndUpdate({ _id: params.id }, teamData, (err, teamUpdate) => {
        console.log(teamUpdate);
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!teamUpdate) {
                res.status(404)
                    .send({ message: "No se ha encontrado ningun equipo" });
            } else {
                res.status(200).send({ message: "equipo actualizado correctamente" })
            }
        }
    })
    
}

function getAvatar(req, res) {
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;

    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(404).send({ message: "El avatar no existe" });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}

function getPlayersTeams(req,res){
    const query = req.query;
    console.log(query);
    const teamId = query.teamId;  
    Player.find({teamId:teamId},(err,playersData)=>{
        if(err){
            res.stats(500).send({message:"Error en el servidor"});
        }else{
            if(!playersData){
                res.status(404).send({message:"No se ha encontrado ningun jugador para ese equipo"});
            }else{
                res.status(200).send(playersData);
            }
        }
    });
}

function getPlayersInfo(req,res){
    const query = req.query;
    const playerId = query.playerId;  
    console.log(playerId);
    nba.stats.playerInfo({ PlayerID: playerId }).then(
        ps=>{
            if(!ps){
                res.status(404).send({message:"Naaao existe jugador"});
            }
            res.status(200).send(ps);
        }).catch(ex=>{
            return res.status(404).send({message:"No existe jugador"})
        });
}

function getPlayersState(req,res){
        nba.stats.playerStats({Season:"2021-22"}).then(ps=>{
            res.status(200).send(ps);
        }
    )
}

function getLeagueLeaders(req,res){
    nba.stats.leagueLeaders({Season:"2021-22"}).then(ps=>{
        res.status(200).send(ps);
    }
)
}

function getScores(req,res){
    const gameDate = req.params.gameDate;
    nba.stats.scoreboard({gameDate: gameDate}).then(s=>{
        res.status(200).send(s);
    })
}

function getBoxScore(req,res){
    const query = req.query;
    const gameId = query.gameId;
    nba.stats.boxScore({ GameID: gameId }).then(s=>{
        res.status(200).send(s);
    }).catch(ex=>{
        console.log(ex);
        return res.status(404).send({message:"No existe jugador"})
    });
}

function getPlayerProfile(req,res){
    const query = req.query;
    const playerId = query.playerId;
    nba.stats.playerProfile({ PlayerID: playerId },{Season:"2021-22"}).then(s=>{
        res.status(200).send(s);
    }).catch(ex=>{
        console.log(ex);
        return res.status(404).send({message:"No existe jugador"})
    });
}

function getplayByPlay(req,res){
    const query = req.query;
    const gameId = query.gameId;
    nba.stats.playByPlay({ GameID: gameId }).then(s=>{
        res.status(200).send(s);
    }).catch(ex=>{
        console.log(ex);
        return res.status(404).send({message:"No existe jugador"})
    });
}

module.exports = {
    getTeam,
    getTeamsDB,
    uploadLogo,
    updateTeam,
    getAvatar,
    getPlayers,
    getPlayersTeams,
    getPlayersInfo,
    getPlayersState,
    getLeagueLeaders,
    getScores,
    getBoxScore,
    getPlayerProfile,
    getplayByPlay
};
