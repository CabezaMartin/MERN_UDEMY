import React, {useState,useEffect} from "react";
import "./GamesWeb.scss";
import Game from "../../../components/Admin/Team/Game";

export default function LeaderTeamWeb(props){
    const dateFormat = 'YYYY-MM-DD';
    let yourDate = new Date();
    yourDate = yourDate.toISOString().split('T')[0];
    return (
        <div className="teams">
            <Game
            yourDate={yourDate}
            dateFormat={dateFormat}
           />
        </div>
    );
}

