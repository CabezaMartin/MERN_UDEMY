import React, {useState,useEffect} from "react";
import ShowState from "../../../components/Admin/Player/ShowState";
//import { useLocation } from 'react-router-dom'
import "./PlayerInfo.scss";

export default function PlayersTeam(props){
    const {location}=props;
    const [playerId, setPlayerId] = useState(location.state.record)
    
    return (
        <div className="teams">
            <ShowState player={playerId}/>
        </div>
    );
}