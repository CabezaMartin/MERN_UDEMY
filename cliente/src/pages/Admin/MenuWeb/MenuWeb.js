import React, {useState,useEffect} from "react";
import {getAccessToken} from '../../../api/auth';
import {addMenu,getMenus} from '../../../api/menu';
import ListMenus from '../../../components/Admin/Menu/ListMenus';
import "./MenuWeb.scss";

export default function MenuWeb(){
    const [menus,setMenus] = useState([]);
    const [reloadMenus, setReloadMenus] = useState(false);
    const token = getAccessToken();
    //console.log(usersActive);
    useEffect(()=>{
        getMenus(token).then(response=>{
            setMenus(response.menu);
        });
        setReloadMenus(false);        
    },[token,reloadMenus]);
    return (
        <div className="menus">
            <ListMenus 
                menus={menus}
                setReloadMenus={setReloadMenus}
           />
        </div>
    );
}