import React, { useState,useEffect } from "react";
import "./ListPlayers.scss";
import { TeamOutlined } from "@ant-design/icons";
import { Tooltip ,  List, Button,Table,  Select, Avatar, Breadcrumb} from "antd";
import Modal from "../../../Admin/Modal";
import {getPlayersTeam} from '../../../../api/team';
//import { getAccessToken } from "../../../../api/auth";
import ShowState from "../../../../components/Admin/Player/ShowState";
import { Link } from "react-router-dom";
import { getPlayerState } from "../../../../hooks/functions"; 

export default function ListPlayers(props) {
  const {teams,teamIdLocation} = props;
  const t = teamIdLocation === "" ? null : teamIdLocation;
  const [modalCollapsed, setmodalCollapsed] = useState(false);  
  const [modalTitle, setModalTitle] =  useState("");
  const [modalContent, setModalContent] =  useState(null);  
  const [teamData,setTeamData]=useState([]);
  const [teamId,setTeamId]=useState(t);
  const [players,setPlayers]=useState([]);
  const [playersReload, setPlayersReload] = useState(false);
  const { Option } = Select;

  const columns = [
    {
     title: 'PLAYER',
     dataIndex: 'PLAYER',
     render: (text,record) => {
       console.log(record)
       const l = `https://cdn.nba.com/headshots/nba/latest/260x190/${record.playerId}.png`;
      return (
       <div>
        <Link to={{pathname:"/showPlayer", state:{record}}}>
          <Avatar src={l}/>
          <div>{record.playerName}</div>
        </Link>
       </div>
     );},     
    },
    {
     title: 'MIN',
     dataIndex: 'min',
     sorter: (a, b) => a.min - b.min     
    },
    {
     title: 'PTS',
     dataIndex: 'pts',
     sorter: (a, b) => a.pts - b.pts
    },
    {
     title: 'AST',
     dataIndex: 'ast',
     sorter: (a, b) => a.ast - b.ast
    },
    {
     title: 'REB',
     dataIndex: 'reb',
     sorter: (a, b) => a.reb - b.reb
    },
    {
     title: 'STL',
     dataIndex: 'stl',
     sorter: (a, b) => a.stl - b.stl
    },
    {
     title: 'BLK',
     dataIndex: 'blk',
     sorter: (a, b) => a.blk - b.blk
    }];
  
  useEffect(()=>{
  
  if(teams){
    if(teams.length>0){
      const aux = [];
      teams.forEach(e => {
        aux.push(<Option value={e.teamId}>{e.teamName}</Option>);
      });
      setTeamData(aux);
    }
  }

},[teams]);

useEffect(()=>{ 
 
  if(teamId){
    getPlayerState(teamId).then(r=>{
      setPlayers(r);
      setPlayersReload(true);
    });
  }

},[teamId]);

useEffect(()=>{   
  setTeamId(t);
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
    getPlayerState(e).then(r=>{
      setPlayers(r);
      setPlayersReload(true);
    });
//  }
}

  return (

    <div className="list-menus">
      <div>
        <div className="list-menus__header-switch">
          <Breadcrumb separator=">">
            <Link to={{pathname:"/leaders"}}>     
              <Breadcrumb.Item>Regular Season Standings</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Roster</Breadcrumb.Item>              
          </Breadcrumb>
            <Select
              placeholder="Seleccione un equipo"
              value={teamId}
              onChange={playersTeam}
            >
              {teamData}
            </Select>
        </div>
      </div>      
      <PlayersItem 
            state={players} 
            //setPlayersReload = {setPlayersReload}
            columns={columns}
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
  const { state,columns } = props;
  return(
    <Table columns={columns} dataSource={state} pagination={{ position:["none"],showTitle:false,defaultPageSize: 15}}/>
  )
  
}
