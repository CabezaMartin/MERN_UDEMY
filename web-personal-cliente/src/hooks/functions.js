import {getPlayersState} from "../api/team";
import {getPlayerInfo} from "../api/player";



export default function getScoreboardParse(response){
    let res = [];
    let struct = {};
    let structAux = {};
    let gameId = "";
    
    if(response.lineScore.length>0){
        response.lineScore.forEach(e => {
            if(gameId==""){ 
                gameId=e.gameId
                structAux.gameId = e.gameId;
                structAux.teamId = e.teamId;
                structAux.pts = e.pts;
                structAux.teamWinsLosses = e.teamWinsLosses;
                structAux.fgPct = e.fgPct;
                structAux.ftPct = e.ftPct;
                structAux.fg3Pct = e.fg3Pct;
                structAux.ast = e.ast;
                structAux.reb = e.reb;     
                structAux.teamAbbreviation = e.teamAbbreviation;
            }else{
                struct.gameId = structAux.gameId;
                struct.teamIdTeamA = structAux.teamId;
                struct.ptsTeamA = structAux.pts;
                struct.teamWinsLossesTeamA = structAux.teamWinsLosses;
                struct.fgPctTeamA = structAux.fgPct;
                struct.ftPctTeamA = structAux.ftPct;
                struct.fg3PctTeamA = structAux.fg3Pct;
                struct.astTeamA = structAux.ast;
                struct.rebTeamA = structAux.reb;       
                struct.teamAbbreviationTeamA = structAux.teamAbbreviation;             
        
                struct.teamIdTeamB = e.teamId;
                struct.ptsTeamB = e.pts;
                struct.teamWinsLossesTeamB = e.teamWinsLosses;
                struct.fgPctTeamB = e.fgPct;
                struct.ftPctTeamB = e.ftPct;
                struct.fg3PctTeamB = e.fg3Pct;
                struct.astTeamB = e.ast;
                struct.rebTeamB = e.reb;     
                struct.teamAbbreviationTeamB = e.teamAbbreviation;     
                res.push(struct);
                struct = {};
                gameId = "";
                structAux= {};
            }
    
        });        
    }
    return res;
}

export function getStatePlayersGame(response){
    let res = [];
    let arrA=[];
    let arrB=[];
    let structA = {};
    let structB = {};
    let teamId = "";
    if(response.resultSets.length>0){
        response.resultSets[0].rowSet.forEach(e=>{
            console.log(e);
            if(teamId ==="" || teamId ===e[1]){
                teamId = e[1];
                structA.TEAM_ID = e[1];
                structA.TEAM_NAME=e[2];
                structA.PLAYER_ID = e[4];
                structA.PLAYER_NAME = e[5];
                structA.MIN = e[9]===null?"0":e[9];
                structA.REB = e[21]===null?"0":e[21];
                structA.AST = e[22]===null?"0":e[22];
                structA.STL = e[23]===null?"0":e[23];
                structA.BLK = e[24]===null?"0":e[24];
                structA.PTS = e[27]===null?"0":e[27];
                arrA.push(structA);
                structA = {};
            }else{
                teamId = "entro";
                structB.TEAM_ID = e[1];
                structB.TEAM_NAME=e[2];
                structB.PLAYER_ID = e[4];
                structB.PLAYER_NAME = e[5];
                structB.MIN = e[9]===null?"0":e[9];
                structB.REB = e[21]===null?"0":e[21];
                structB.AST = e[22]===null?"0":e[22];
                structB.STL = e[23]===null?"0":e[23];
                structB.BLK = e[24]===null?"0":e[24];
                structB.PTS = e[27]===null?"0":e[27];
                arrB.push(structB);
                structB = {};
            }
        });
    }
    res.push(arrA);
    res.push(arrB);
    return res;
}

export function getPlayerStateAux(response){
    return  new Promise( async (resolve, reject) => {

        let playersRet = [];
        let playerInfo = {};
        if(response){
            let r = await response.forEach(async e=>{

                await callPlayerState(e.playerId,playerInfo);

                playersRet.push(playerInfo);
                playerInfo = {};
            });

            r.then(e=>{
                resolve(playersRet);
            })
        }else{
            return playersRet;
        }

    });

}


async function callPlayerState(p,playerInfo){
    return new Promise( async (resolve, reject) => {
            await getPlayerInfo(p).then(playerRes=>{
            playerInfo.personId = playerRes.commonPlayerInfo[0].personId
            playerInfo.firstName = playerRes.commonPlayerInfo[0].firstName
            playerInfo.lastName = playerRes.commonPlayerInfo[0].lastName
            playerInfo.birthdate =playerRes.commonPlayerInfo[0].birthdate
            playerInfo.school = playerRes.commonPlayerInfo[0].school
            playerInfo.country = playerRes.commonPlayerInfo[0].country
            playerInfo.height = playerRes.commonPlayerInfo[0].height
            playerInfo.weight = playerRes.commonPlayerInfo[0].weight
            playerInfo.seasonExp = playerRes.commonPlayerInfo[0].seasonExp
            playerInfo.jersey = playerRes.commonPlayerInfo[0].jersey
            playerInfo.position = playerRes.commonPlayerInfo[0].position
            playerInfo.teamId = playerRes.commonPlayerInfo[0].teamId
            playerInfo.teamName = playerRes.commonPlayerInfo[0].teamName
            playerInfo.teamCity = playerRes.commonPlayerInfo[0].teamCity
            playerInfo.fromYear = playerRes.commonPlayerInfo[0].fromYear
            playerInfo.toYear = playerRes.commonPlayerInfo[0].toYear
            playerInfo.draftYear = playerRes.commonPlayerInfo[0].draftYear
            playerInfo.draftRound = playerRes.commonPlayerInfo[0].draftRound
            playerInfo.draftNumber = playerRes.commonPlayerInfo[0].draftNumber
            playerInfo.pts = playerRes.commonPlayerInfo[0].pts
            playerInfo.ast = playerRes.commonPlayerInfo[0].ast
            playerInfo.reb = playerRes.commonPlayerInfo[0].reb
            playerInfo.pie = playerRes.commonPlayerInfo[0].pie     

            resolve(playerInfo);             
        });  
    });    
}

export async function getPlayerState(teamId){
    const respuesta = [];
    await getPlayersState().then(res=>{
        res.leagueDashPlayerStats.forEach(e=>{
            if(e.teamId===teamId){
                respuesta.push(e);
            }
        });
    })
    return respuesta;
}