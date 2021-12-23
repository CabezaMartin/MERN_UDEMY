import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from "antd";
import { HomeOutlined , UserOutlined,MenuOutlined, TrophyOutlined     } from '@ant-design/icons';
import './MenuSisder.scss';

 function MenuSider(props) {
    const {menuCollapsed, location} = props;
    const {Sider} = Layout;
    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys ={location.pathname}>
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <UserOutlined  />
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>    
                <Menu.Item key="/admin/menu">
                    <Link to={"/admin/menu"}>
                        <MenuOutlined   />
                        <span className="nav-text">Menu</span>
                    </Link>
                </Menu.Item>       
                <Menu.Item key="/admin/teams">
                    <Link to={"/admin/teams"}>
                        <TrophyOutlined   />
                        <span className="nav-text">Equipos</span>
                    </Link>
                </Menu.Item>      
                <Menu.Item key="/admin/players">
                    <Link to={"/admin/players"}>
                        <TrophyOutlined   />
                        <span className="nav-text">Jugadores</span>
                    </Link>
                </Menu.Item>          
                <Menu.Item key="/admin/leaders">
                    <Link to={"/admin/leaders"}>
                        <TrophyOutlined   />
                        <span className="nav-text">Clasificación</span>
                    </Link>
                </Menu.Item>                                                                                    
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);