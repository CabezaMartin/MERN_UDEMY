import React, { useState,useEffect } from "react";
import "./LeaderTeam.scss";
import { EditOutlined,TeamOutlined } from "@ant-design/icons";
import { Table ,  List, Avatar, Select,  Switch } from "antd";
import {getLogoApi} from '../../../../api/team';
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { getAccessToken } from "../../../../api/auth";

export default function LeaderTeam(props) {
  const {teamsWest,teamsEast,setReloadTeams} = props;
  const [comoValue,setComboValue] = useState("east");
  const [viewTeamsEast,setViewEastWest] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const { Option } = Select;
  const token = getAccessToken();
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

    function change(e){
      setViewEastWest(!viewTeamsEast)
      setComboValue(e);
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
              {viewTeamsEast ? "Clasificacion Este" : "Clasificacion Oeste"}
            </span>          
        </div>
        <div>
        <Select
              placeholder="Seleccione una conferencia"
              onChange={(e) => console.log(e)}
              value="1"
            > 
              <Option value="1">2021-22</Option>
              <Option value="2">2020-21</Option>
              <Option value="3">2019-20</Option>
              <Option value="4">2018-19</Option>
              <Option value="5">2017-18</Option>
              <Option value="6">2016-17</Option>
              <Option value="7">2015-16</Option>
              <Option value="8">2014-15</Option>
              <Option value="9">2013-14</Option>
              <Option value="10">2012-13</Option>                                          
            </Select>
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
