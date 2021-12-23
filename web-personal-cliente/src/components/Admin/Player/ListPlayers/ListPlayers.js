import React, { useState,useEffect } from "react";
import "./ListPlayers.scss";
import { EditOutlined,TeamOutlined } from "@ant-design/icons";
import { Tooltip ,  List, Button, Avatar, Select, notification,  Modal as ModalAntd} from "antd";
import Modal from "../../../Admin/Modal";
//import Menu from "../../../../pages/Admin/MenuWeb/MenuWeb";
import {getTeam,getPlayersTeam} from '../../../../api/team';
import { getAccessToken } from "../../../../api/auth";
//import ColumnGroup from "rc-table/lib/sugar/ColumnGroup";
import ShowState from "../../../../components/Admin/Player/ShowState";
//import CreateMenuForm from "../../../../components/Admin/Menu/CreateMenu";
const {confirm} = ModalAntd;

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
  
  if(teams.length>0){
    const aux = [];
    teams.forEach(e => {
      aux.push(<Option value={e.teamId}>{e.teamName}</Option>);
    });
    setTeamData(aux);
    console.log('raaarrrr'+JSON.stringify(teamData));
  }
},[teams]);

useEffect(()=>{  
  console.log(players);
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
  getPlayersTeam(token,e).then(r=>{
    //console.log(players);
    setPlayers(r);
    setPlayersReload(true);
  });
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
            setPlayersReload = {setPlayersReload}
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
  const { players,setPlayersReload,showPlayers} = props;
    const token = getAccessToken();

   
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

 // const [avatar, setAvatar] = useState(null);

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
      //avatar={<Avatar src={avatar} />}
      title={`
                      ${player.firstName} ${player.lastName}
                  `}
      description={player.playerId}
    />
  </List.Item>
  );
}
