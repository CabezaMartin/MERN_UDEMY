import React, { useState, useEffect } from "react";
import { Descriptions, Breadcrumb, Avatar } from "antd";
import {  getPlayerInfo} from "../../../../api/player";
import { Link } from "react-router-dom";
import "./ShowState.scss";

export default function ShowState(props) {
  const { player} = props;

  console.log(player);
  const [playerData, setPlayerData] = useState({
    personId: player.personId,
    firstName: player.firstName,
    lastName: player.lastName,
    birthdate:player.birthdate,
    school: player.school,
    country: player.country,
    height: player.height,
    weight: player.weight,
    seasonExp: player.seasonExp,
    jersey: player.jersey,
    position: player.position,
    teamId: player.teamId,
    teamName: player.teamName,
    teamCity: player.teamCity,
    fromYear: player.fromYear,
    toYear: player.toYear,
    draftYear: player.draftYear,
    draftRound: player.draftRound,
    draftNumber: player.draftNumber,
    pts: player.pts,
    ast: player.ast,
    reb: player.reb,
    pie: player.pie
  });

  useEffect(() => {
    getPlayerInfo(player.playerId).then(playerRes=>{
      setPlayerData({
        personId: playerRes.commonPlayerInfo[0].personId,
        birthdate:playerRes.commonPlayerInfo[0].birthdate,
        school: playerRes.commonPlayerInfo[0].school,
        firstName: playerRes.commonPlayerInfo[0].firstName,
        lastName: playerRes.commonPlayerInfo[0].lastName,      
        country: playerRes.commonPlayerInfo[0].country,
        height: playerRes.commonPlayerInfo[0].height,
        weight: playerRes.commonPlayerInfo[0].weight,
        seasonExp: playerRes.commonPlayerInfo[0].seasonExp,
        jersey: playerRes.commonPlayerInfo[0].jersey,
        position: playerRes.commonPlayerInfo[0].position,
        teamId: playerRes.commonPlayerInfo[0].teamId,
        teamName: playerRes.commonPlayerInfo[0].teamName,
        teamCity: playerRes.commonPlayerInfo[0].teamCity,
        fromYear: playerRes.commonPlayerInfo[0].fromYear,
        toYear: playerRes.commonPlayerInfo[0].toYear,
        draftYear: playerRes.commonPlayerInfo[0].draftYear,
        draftRound: playerRes.commonPlayerInfo[0].draftRound,
        draftNumber: playerRes.commonPlayerInfo[0].draftNumber,
        pts: playerRes.playerHeadlineStats[0].pts,
        ast: playerRes.playerHeadlineStats[0].ast,
        reb: playerRes.playerHeadlineStats[0].reb,
        pie: playerRes.playerHeadlineStats[0].pie        
      });
    });

  }, [player]);
  
  

  console.log(playerData);
  return (
    <div className="show-state">
      <ShowForm
        playerData={playerData}
      />
    </div>
  );
}

function ShowForm(props) {
  const { playerData} = props;

  return (

    <div className="show-state__show-form">
      <Breadcrumb separator=">">
        <Link to={{pathname:"/leaders"}}>     
          <Breadcrumb.Item>Regular Season Standings</Breadcrumb.Item>
        </Link>
        <Link to={{pathname:"/players"}}>  
          <Breadcrumb.Item>Roster</Breadcrumb.Item>    
        </Link>      
        <Breadcrumb.Item>Info</Breadcrumb.Item>     
      </Breadcrumb>
      <div className="show-state__show-form__info">
        <div>
          <Avatar src={`https://cdn.nba.com/headshots/nba/latest/260x190/${playerData.personId}.png`}/>
        </div>
        <div className="show-state__show-form__descriptions">
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Name">{playerData.firstName}</Descriptions.Item>
            <Descriptions.Item label="LastName">{playerData.lastName}</Descriptions.Item>
            <Descriptions.Item label="Position">{playerData.position}</Descriptions.Item>

            <Descriptions.Item label="country">{playerData.country}</Descriptions.Item>
            <Descriptions.Item label="height">{playerData.height}</Descriptions.Item>
            <Descriptions.Item label="weight">{playerData.weight}</Descriptions.Item>     

            <Descriptions.Item label="teamName">{playerData.teamName}</Descriptions.Item>
            <Descriptions.Item label="jersey">{playerData.jersey}</Descriptions.Item>
            <Descriptions.Item label="teamCity">{playerData.teamCity}</Descriptions.Item>

            <Descriptions.Item label="pts">{playerData.pts}</Descriptions.Item>
            <Descriptions.Item label="ast">{playerData.ast}</Descriptions.Item>
            <Descriptions.Item label="reb">{playerData.reb}</Descriptions.Item> 
          </Descriptions>   
        </div>
      </div>

    </div>

  );
}
