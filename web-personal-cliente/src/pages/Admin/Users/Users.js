import React, {useState,useEffect} from "react";
import {getAccessToken} from '../../../api/auth';
import {getUsersApi,getUsersActiveApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/User/ListUsers';
import "./Users.scss";

export default function User(){
    const [usersActive,setUsersActive,] = useState([]);
    const [usersInactive,setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessToken();
    //console.log(usersActive);
    useEffect(()=>{
        getUsersActiveApi(token,true).then(response=>{
            setUsersActive(response.users);
        });
        getUsersActiveApi(token,false).then(response=>{
            setUsersInactive(response.users);
        });
        setReloadUsers(false);        
    },[token,reloadUsers]);
    return (
        <div className="users">
            <ListUsers 
            usersActive={usersActive} 
            usersInactive={usersInactive}
            setReloadUsers={setReloadUsers}/>
        </div>
    );
}