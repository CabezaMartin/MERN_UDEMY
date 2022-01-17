import React, { useState,useEffect } from "react";
import "./ListTeams.scss";
import { EditOutlined,TeamOutlined } from "@ant-design/icons";
import { Tooltip ,  List, Button, Avatar, Layout,  Modal as ModalAntd} from "antd";
import Modal from "../../../Admin/Modal";
import {getLogoApi} from '../../../../api/team';
import { getAccessToken } from "../../../../api/auth";
import EditTeam from "../../../../components/Admin/Team/EditTeam";
//import ListPlayers from "../../Player/ListPlayers";
import {Link} from 'react-router-dom';
const {confirm} = ModalAntd;

export default function ListTeams(props) {
  const {  Content } = Layout;
  const [modalCollapsed, setmodalCollapsed] = useState(false);  
  const [modalTitle, setModalTitle] =  useState("");
  const [modalContent, setModalContent] =  useState(null);  
  const {teams,setReloadTeams} = props;
  const token = getAccessToken();
  console.log('2222');
  
  const editTeam = team =>{
    console.log("1."+team);
    setmodalCollapsed(!modalCollapsed)
    setModalTitle(`Editar ${team.teamName ? team.teamName : '...'}`);
    setModalContent(<EditTeam team={team}
       setmodalCollapsed={setmodalCollapsed}
       setReloadTeams={setReloadTeams}/>);
}



const showPlayers = team =>{
  console.log(team);
 // <Link to={"/players"}></Link>
}

  return (

    <div className="list-menus">
      <TeamItems 
            teams={teams} 
            setReloadTeams = {setReloadTeams}
            editTeam={editTeam}
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

function TeamItems(props) {
  const { teams,setReloadTeams,editTeam,showPlayers} = props;
    const token = getAccessToken();

   
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={teams}
      renderItem={team => 
      <TeamItem 
      team={team} 
      editTeam={editTeam}
      showPlayers={showPlayers}
    />}
    />
  );
}

function TeamItem(props){
  const {team,editTeam,showPlayers} = props;

  const [avatar, setAvatar] = useState(null);

  useEffect(()=>{
    if(team.avatar){
      getLogoApi(team.avatar).then(response=>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
  },[avatar]);

  return(
    <List.Item
    actions={[
      <Tooltip title="Jugadores">
        <Link to={{pathname:"/admin/players", state:"hola"}}  >
          <Button
            type="primary"
            //onClick={() => showPlayers(team)}
            //href="players" 
            >
            <TeamOutlined  />          
          </Button>
        </Link>

      </Tooltip>,      
      <Tooltip title="Editar">
      <Button
        type="primary"
        onClick={() => editTeam(team)}
      >
        <EditOutlined />
      </Button>
      </Tooltip>
    ]}
  >
    <List.Item.Meta
      avatar={<Avatar src={avatar} />}
      title={`
                      ${team.teamName ? team.teamName : ".."}
                  `}
      description={team.url}
    />
  </List.Item>
  );
}
