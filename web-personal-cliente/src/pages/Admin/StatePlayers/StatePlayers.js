import React, {useState,useEffect} from "react";
import {getBoxScore} from '../../../api/team';
import ListStatePlayers from "../../../components/Admin/Player/ListStatePlayers/ListStatePlayers";
import { getStatePlayersGame } from "../../../hooks/functions";
import "./StatePlayers.scss";

export default function StatePlayers(props){

    const { location } = props;
    const [gameId,setGameId] = useState(location.state.gameId);
    const [stateAGame,setStateAGame] = useState(null);
    const [stateBGame,setStateBGame] = useState(null);
    const [value,setValue] = useState("");
    const [combo,setStateCombo] = useState([]);
    console.log(gameId);
    let comboAux = [];
    useEffect(()=>{           
        getBoxScore(gameId).then(res=>{
            let f = getStatePlayersGame(res);
            let data = {};
            data.teamName = res.resultSets[1].rowSet[0][2];
            data.teamId = res.resultSets[1].rowSet[0][1];
            comboAux.push(data);
            data = {};
            data.teamName = res.resultSets[1].rowSet[1][2];
            data.teamId = res.resultSets[1].rowSet[1][1];
            comboAux.push(data);
            setValue(comboAux[0].teamId);
            setStateCombo(comboAux);
            setStateAGame(f[0]);
            setStateBGame(f[1]);
        });
    },[]);  

    return (
       <ListStatePlayers stateAGame={stateAGame} stateBGame={stateBGame} combo={combo} value={value}/>
    );
}