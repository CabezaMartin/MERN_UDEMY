import React, {useState,useEffect} from "react";
import {getAccessToken} from '../../../api/auth';
import {getTeam} from '../../../api/team';
import ListTeams from '../../../components/Admin/Team/ListTeams';
import ListMenus from '../../../components/Admin/Menu/ListMenus';
import "./TeamWeb.scss";

export default function TeamWeb(props){
    const { routes } = props;
    
console.log(routes);
    const [teams,setTeams] = useState([]);
    const [reloadTeams, setReloadTeams] = useState(false);
    const token = getAccessToken();

    useEffect(()=>{
        getTeam(token).then(response=>{
            setTeams(response.teams);
            console.log(response.teams);
        });
        setReloadTeams(false);       
        console.log('111'); 
    },[token,reloadTeams]);

    return (
        <div className="teams">
            <ListTeams
                teams={teams}
                setReloadTeams={setReloadTeams}
           />
        </div>
    );
}