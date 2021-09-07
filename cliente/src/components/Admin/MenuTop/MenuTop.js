import React from 'react';
import Logo from "../../../assets/img/png/reactLogo.png";
import { Button } from "antd";
import { PoweroffOutlined, MenuUnfoldOutlined, MenuFoldOutlined     } from '@ant-design/icons';
//import Icon from '@ant-design/icons';
import './MenuTop.scss';
import {logout} from '../../../api/auth';

export default function MenuTop(props) {
    const {menuCollapsed,setMenuCollapsed} = props;
    const iconMenu = !menuCollapsed ? <MenuUnfoldOutlined/>:<MenuFoldOutlined/>;
    const logoutUser = ()=>{
        logout();
        window.location.reload();
    };
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                src={Logo}
                alt="Martin"
                />
                <Button type="link" onClick={()=>setMenuCollapsed(!menuCollapsed)}>
                    {iconMenu}
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser}>
                    <PoweroffOutlined/>
                </Button>
            </div>
        </div>
    );
}