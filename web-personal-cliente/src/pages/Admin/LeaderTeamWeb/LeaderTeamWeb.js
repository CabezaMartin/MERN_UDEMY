import React, {useState,useEffect} from "react";
import LeaderTeam from '../../../components/Admin/Team/LeaderTeam';
import "./LeaderTeamWeb.scss";

export default function LeaderTeamWeb(props){

    //const [reloadTeams, setReloadTeams] = useState(false);

    return (
        <div className="teams">
            <LeaderTeam
           />
        </div>
    );
}

