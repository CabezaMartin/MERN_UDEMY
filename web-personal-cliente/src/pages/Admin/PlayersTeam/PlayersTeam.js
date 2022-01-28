import React, {useState,useEffect} from "react";
import {getAccessToken} from '../../../api/auth';
import {getPlayersTeam,getTeam} from '../../../api/team';
import ListPlayers from "../../../components/Admin/Player/ListPlayers";
import { Select, Modal as ModalAntd} from "antd";
import ListTeams from '../../../components/Admin/Team/ListTeams';
//import { useLocation } from 'react-router-dom'
import "./PlayersTeam.scss";

export default function PlayersTeam(props){
    const {location, history}=props;
    
    const locState = location.state;
    const teamId = locState ? locState.record.teamId : '';
    const [teams,setTeams] = useState([]);
    const [reloadTeams, setReloadTeams] = useState(false);
    const token = getAccessToken();
    const { Option } = Select;
    useEffect(()=>{
        
        getTeam(token).then(response=>{
            setTeams(response.teams);
            //console.log(response.teams);
        });
        setReloadTeams(false);       
    },[token,reloadTeams]);

    return (
        <div className="teams">
            <ListPlayers
                teams={teams}
                setReloadTeams={setReloadTeams}
                teamIdLocation={teamId}
           />
        </div>
    );
}