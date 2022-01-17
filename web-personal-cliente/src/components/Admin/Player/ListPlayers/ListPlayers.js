import React, { useState,useEffect } from "react";
import "./ListPlayers.scss";
import { TeamOutlined } from "@ant-design/icons";
import { Tooltip ,  List, Button,  Select} from "antd";
import Modal from "../../../Admin/Modal";
import {getPlayersTeam} from '../../../../api/team';
import { getAccessToken } from "../../../../api/auth";
import ShowState from "../../../../components/Admin/Player/ShowState";

export default function ListPlayers(props) {
  const {teams} = props;
  const [modalCollapsed, setmodalCollapsed] = useState(false);  
  const [modalTitle, setModalTitle] =  useState("");
  const [modalContent, setModalContent] =  useState(null);  
  const [teamData,setTeamData]=useState([]);
  const [teamId,setTeamId]=useState(null);
  const [players,setPlayers]=useState([]);
  const [playersReload, setPlayersReload] = useState(false);
  const token = getAccessToken();
  const { Option } = Select;

  
  useEffect(()=>{
  
  if(teams){
    if(teams.length>0){
      const aux = [];
      teams.forEach(e => {
        aux.push(<Option value={e.teamId}>{e.teamName}</Option>);
      });
      setTeamData(aux);
      //console.log('raaarrrr'+JSON.stringify(teamData));
    }
  }

},[teams]);

useEffect(()=>{  
  console.log(players);
  console.log(playersReload);
},[setPlayersReload]);


const showPlayers = player =>{
  console.log(player);
  setmodalCollapsed(!modalCollapsed)
  setModalTitle(`${player.firstName} ${player.lastName}`);
  setModalContent(<ShowState player={player}
     setmodalCollapsed={setmodalCollapsed}
     setPlayersReload={setPlayersReload}/>);  
}

const playersTeam = e =>{
  setTeamId(e);
 // if(teamId){
    getPlayersTeam(token,teamId).then(r=>{
      //console.log(players);
      setPlayers(r);
      setPlayersReload(true);
    });
//  }
}

  return (

    <div className="list-menus">
      <div className="list-menus">
        <div className="list-menus__header-switch">
            <Select
              placeholder="Seleccione un equipo"
              value={teamData.teamId}
              onChange={playersTeam}
            >
              {teamData}
            </Select>
        </div>
      </div>      
      <PlayersItem 
            players={players} 
            //setPlayersReload = {setPlayersReload}
            showPlayers={showPlayers}
        />
      <Modal
        title={modalTitle}
        isVisible={modalCollapsed}
        setIsVisible={setmodalCollapsed}
      >
         {modalContent}
      </Modal>
    </div>
  );
}

function PlayersItem(props) {
  const { players/*,setPlayersReload*/,showPlayers} = props;
  
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={players}
      renderItem={player => 
      <PlayerItem 
      player={player} 
      showPlayers={showPlayers}
    />}
    />
  );
}

function PlayerItem(props){
  const {player,showPlayers} = props;
  return(
    <List.Item
    actions={[
      <Tooltip title="Jugadores">
      <Button
        type="primary"
        onClick={() => showPlayers(player)}
      >
        <TeamOutlined  />
      </Button>
      </Tooltip>
    ]}
  >
    <List.Item.Meta
      title={`
                      ${player.firstName} ${player.lastName}
                  `}
      description={player.playerId}
    />
  </List.Item>
  );
}
