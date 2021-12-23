import React, {useState,useEffect} from "react";
import {getState} from '../../../api/team';
import LeaderTeam from '../../../components/Admin/Team/LeaderTeam';
import "./LeaderTeamWeb.scss";

export default function LeaderTeamWeb(props){
    const [teamsWest,setTeamsWest] = useState([]);
    const [teamsEast,setTeamsEast] = useState([]);
    const [reloadTeams, setReloadTeams] = useState(false);

    useEffect(()=>{
        getState().then(response=>{
            console.log('1');
            let weast = teamWest(response);
            let east = teamEast(response);
            
            setTeamsEast(east);
            setTeamsWest(weast);
            console.log(teamsEast);
            console.log(teamsWest);
        });
        setReloadTeams(false);       
    },[reloadTeams]);

    return (
        <div className="teams">
            <LeaderTeam
                teamsWest={teamsWest}
                teamsEast={teamsEast}
                setReloadTeams={setReloadTeams}
           />
        </div>
    );
}

function teamEast(team){
    let teamEast = []
    team.forEach(element => {
        if(element.conference==="east"){
            teamEast.push(element);
        }
    });
    return teamEast;
}

function teamWest(team){
    let teamWest = []
    team.forEach(element => {
        if(element.conference==="west"){
            teamWest.push(element);
            console.log('1b');
        }
    });
    return teamWest;
}