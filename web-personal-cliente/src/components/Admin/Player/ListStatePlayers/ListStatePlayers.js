import React, { useState,useEffect } from "react";
import "./ListPlayers.scss";
import {Avatar,Table,Select,Breadcrumb} from "antd";
import {} from '../../../../api/team';
import { Link } from 'react-router-dom';

export default function ListStatePlayers(props) {
  const {stateAGame,stateBGame,combo,value} = props;
  const [teamAShow,setTeamAShow] = useState(false);
  const [valueCombo,setValueCombo] = useState(value);
  const { Option } = Select;
  console.log(stateAGame)
  
  const columns = [
    {
     title: 'PLAYER',
     dataIndex: 'PLAYER',
     render: (text,record) => {
       console.log(record)
       const l = `https://cdn.nba.com/headshots/nba/latest/260x190/${record.PLAYER_ID}.png`;
      return (
       <div>
        <Avatar src={l}/>
        <div>{record.PLAYER_NAME}</div>
       </div>
     );},     
    },
    {
     title: 'MIN',
     dataIndex: 'MIN',
     sorter: (a, b) => {
        return a.MIN.substring(0,2) - b.MIN.substring(0,2)
     }
    },
    {
     title: 'PTS',
     dataIndex: 'PTS',
     sorter: (a, b) => a.PTS - b.PTS
    },
    {
     title: 'AST',
     dataIndex: 'AST',
     sorter: (a, b) => a.AST - b.AST
    },
    {
     title: 'REB',
     dataIndex: 'REB',
     sorter: (a, b) => a.REB - b.REB
    },
    {
     title: 'STL',
     dataIndex: 'STL',
     sorter: (a, b) => a.STL - b.STL
    },
    {
     title: 'BLK',
     dataIndex: 'BLK',
     sorter: (a, b) => a.BLK - b.BLK
    }];

    function change(e){
      setTeamAShow(!teamAShow)
      setValueCombo(e)
    }
  return (    
    <div>
      {stateAGame ? 
        (  
          <div className="list-teams">
          <div className="list-teams__header">
            <div className="list-teams__header-switch">
            <Breadcrumb separator=">">
              <Link to={{pathname:"/games"}}>     
                <Breadcrumb.Item>Result</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>Player state</Breadcrumb.Item>              
            </Breadcrumb>
                <Select
                    placeholder="Equipo"
                    onChange={e=>change(e)}
                    value={valueCombo}
                  > 
                    <Option value={combo[0].teamId}>{combo[0].teamName}</Option>
                    <Option value={combo[1].teamId}>{combo[1].teamName}</Option>
                </Select>
                <span>
                  {"...Equipo..."}
                </span>          
            </div>
          </div>
          <StatePlayers state={teamAShow ? stateAGame :  stateBGame} columns={columns}/>
        </div>     
        )
      :
        (
        ""
        )}
    </div>
  )
}

function StatePlayers(props){
  const { state,columns } = props;
   return (
    <Table columns={columns} dataSource={state} pagination={{ position:["none"],showTitle:false,defaultPageSize: 15}}/>
   );
}


