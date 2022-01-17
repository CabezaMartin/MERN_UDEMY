import React, { useState,useEffect } from "react";
import "./LeaderTeam.scss";
import { EditOutlined,TeamOutlined } from "@ant-design/icons";
import { Table ,  List, Avatar, Select,  Switch } from "antd";
import {getLogoApi} from '../../../../api/team';
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { getAccessToken } from "../../../../api/auth";
import { getState } from "../../../../api/team";

export default function LeaderTeam(props) {
  const [teamsWest,setTeamsWest] = useState([]);
  const [teamsEast,setTeamsEast] = useState([]);
  const [reloadTeams,setReloadTeams] = useState(false);
  const [comoValue,setComboValue] = useState("east");
  const [viewTeamsEast,setViewEastWest] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const { Option } = Select;
  const token = getAccessToken();
  const [season,setSeason]=useState("2021-22");
  const columns = [
    {
     title: 'Name',
     dataIndex: 'teamName',
     render: (text,record) => {
       console.log(record)
       const l = `http://localhost:3977/api/v1/get-logo/${record.avatar}`;
      return (
       //`http://localhost:3977/api/v1/get-logo/ ${record.avatar}`
       
       <div>
        <Avatar src={l}/>
         <div>
          <div>{record.teamName}</div>
          </div>
       </div>
     );},     
    },
    {
     title: 'gp',
     dataIndex: 'gp',
     sorter: (a, b) => a.gp - b.gp
    },
    {
     title: 'w',
     dataIndex: 'w',
     sorter: (a, b) => a.w - b.w
    },
    {
     title: 'l',
     dataIndex: 'l',
     sorter: (a, b) => a.l - b.l
    },
    {
     title: 'wPct',
     dataIndex: 'wPct',
     sorter: (a, b) => a.wPct - b.wPct
    }]

    useEffect(()=>{
      getState(season).then(response=>{
          let weast = teamWest(response);
          let east = teamEast(response);
          setTeamsEast(east);
          setTeamsWest(weast);
      });
      setReloadTeams(false);       
  },[reloadTeams]);

    function teamEast(team){
      let teamEast = []
      team.forEach(element => {
          if(element.conference==="east"){
              teamEast.push(element);
          }
      });
      teamEast.sort((a,b)=>{return b.wPct - a.wPct})
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
      teamWest.sort((a,b)=>{return b.wPct - a.wPct;})
      return teamWest;
  }

    function change(e){
      setViewEastWest(!viewTeamsEast)
      setComboValue(e);
    }
    function changeSeason(e){
      setSeason(e);
      setReloadTeams(true);
    }
  return (

    <div className="list-teams">
      <div className="list-teams__header">
        <div className="list-teams__header-switch">
            <Select
                placeholder="Seleccione una conferencia"
                onChange={(e) => 
                  change(e)
                }
                value={comoValue}
              > 
                <Option value="east">Este</Option>
                <Option value="weast">Oeste</Option>
            </Select>
            <span>
              {"Clasificacion"}
            </span>          
        </div>
        <div className="list-teams__header-switch">
          <Select
              placeholder="Seleccione una conferencia"
              onChange={(e) => changeSeason(e)}
              value={season}
            > 
              <Option value="2021-22">2021-22</Option>
              <Option value="2020-21">2020-21</Option>
              <Option value="2019-20">2019-20</Option>
              <Option value="2018-19">2018-19</Option>
              <Option value="2017-18">2017-18</Option>
              <Option value="2016-17">2016-17</Option>
              <Option value="2015-16">2015-16</Option>
              <Option value="2014-15">2014-15</Option>              
              <Option value="2013-14">2013-14</Option>
              <Option value="2012-13">2012-13</Option>                                          
          </Select>
          <span>
              {"Season"}
          </span> 
        </div>
      </div>
      {viewTeamsEast ? (
      <TeamsEast
        teamsEast={teamsEast}
        columns={columns}
      />
      )
      :
      (
        <TeamsWeast 
        teamsWest={teamsWest}
        columns={columns}/>
      )}
    </div>
  );
}

function TeamsEast(props){
  const { teamsEast,columns
   } = props;
   return (
    <Table columns={columns} dataSource={teamsEast} pagination={{ position:["none"],showTitle:false,defaultPageSize: 15}}/>
   );
}

function TeamsWeast(props){
  let state = {
    top: 'topLeft',
    bottom: 'bottomRight',
  };
  const { teamsWest,columns
  } = props;

  return (
   <Table columns={columns} dataSource={teamsWest} pagination={{ position:["none"],defaultPageSize: 15}}/>
  );
}
