import React, { useState,useEffect } from "react";
import "./Game.scss";
import { EditOutlined,TeamOutlined } from "@ant-design/icons";
import { DatePicker,Space,Card,List,Button } from "antd";
import { getScoreboard,getBoxScore } from "../../../../api/team";
import getScoreboardParse from "../../../../hooks/functions";
import moment from 'moment';
import {Link} from 'react-router-dom';

export default function Game(props) {
  const {dateFormat,yourDate} = props;
  const [date,setDate] = useState(yourDate);
  const [scoreBoard,setScoreBoard] = useState([]);
  const [reloadScores,setReloadScores] = useState(false);

  useEffect(()=>{    
    if(date){
      getScoreboard(date).then(response=>{
        debugger;
        let f = getScoreboardParse(response);
        setScoreBoard(f);
      });
    }
    setReloadScores(false);  
     
},[reloadScores]);  

  //console.log(yourDate);

  function changeDate(d,dateString){
    //console.log(d);
    //console.log(dateString);
    setReloadScores(true)
    setDate(dateString)
  }

  return (
    <div className="list-teams">
    <div className="list-teams__header">
    <DatePicker onChange ={ (d,dateString) => changeDate(d,dateString)}
      defaultValue={moment(date, dateFormat)} />
    </div>
      <List
        itemLayout="horizontal"
        dataSource={scoreBoard}
        renderItem={s => 
        <SocreSpace 
          s={s} 
      />}
      />
    </div>

  );  
}
function SocreSpace(props){
  const { s } = props;
  debugger;
   return (
    <Space direction="vertical" size="large" align="center">
      <Card className="cardScore" title={`${s.teamAbbreviationTeamA} - ${s.teamAbbreviationTeamB}`}> 
      <List.Item >
        <List.Item.Meta description={<Description 
            teamWinsLossesTeamB={s.teamWinsLossesTeamB}
            teamWinsLossesTeamA={s.teamWinsLossesTeamA}
            ptsTeamA={s.ptsTeamA}
            ptsTeamB={s.ptsTeamB}
            teamIdTeamA={s.teamIdTeamA}
            teamIdTeamB={s.teamIdTeamB}
            gameId={s.gameId}
            />}
        />
    </List.Item>
    </Card>
  </Space>
   );
}
function Description(props){
  debugger;
  const {
    teamWinsLossesTeamB,
    teamWinsLossesTeamA,
    ptsTeamA,ptsTeamB,
    teamIdTeamA,
    teamIdTeamB,
    gameId}=props;
  return (
    <div>
      <div className="descriptionPts">
        <div>
          <img src={`https://cdn.nba.com/logos/nba/${teamIdTeamA}/global/L/logo.svg`}/>
          <p>{teamWinsLossesTeamA}</p>
        </div>
        <b>{ptsTeamA}</b>
      </div>
      <div className="descriptionPts">
        <div>
          <img src={`https://cdn.nba.com/logos/nba/${teamIdTeamB}/global/L/logo.svg`}/>   
          <p>{teamWinsLossesTeamB}</p>
        </div>
        <b>{ptsTeamB}</b>
      </div>
      <div>
        {ptsTeamA? (
                    <Link to={{pathname:"/statePlayers", state:{gameId}}}>        
                    <Button type="link">
                      boxscore
                    </Button>
              </Link>
        ):("")     
        }
      </div>
    </div>
  )
}
