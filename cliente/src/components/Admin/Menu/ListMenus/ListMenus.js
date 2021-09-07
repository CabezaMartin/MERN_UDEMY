import React, { useState,useEffect } from "react";
import "./ListMenus.scss";
import { EditOutlined,StopOutlined,DeleteOutlined, CheckOutlined,UserAddOutlined    } from "@ant-design/icons";
import { Tooltip ,  List, Button, Avatar, notification,  Modal as ModalAntd} from "antd";
import Modal from "../../../Admin/Modal";
//import User from "../../../../pages/Admin/Users/Users";
import {getMenus,addMenu} from '../../../../api/menu';
import { getAccessToken } from "../../../../api/auth";

const {confirm} = ModalAntd;

export default function ListUsers(props) {
  const {menus,setReloadMenus} = props;
  const token = getAccessToken();
  
  return (
    <div className="list-menus">
      <div className="list-menus__header">
        <div className="list-menus__header-btn-add-user">
            <Button
              type="primary"
              onClick={() =>console.log("Crear Menu")}
              >        
              <UserAddOutlined />
              Nuevo menu
            </Button>
          </div>        
      </div>
      <MenuItems 
            menus={menus} 
            setReloadMenus = {setReloadMenus}
        />
    </div>
  );
}

function MenuItems(props) {
  const { menus,setReloadMenus} = props;
    const token = getAccessToken();

   
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={menus}
      renderItem={menu => 
      <MenuItem 
        menu={menu} 
    />}
    />
  );
}

function MenuItem(props){
  const {menu} = props;

  return(
    <List.Item
    actions={[
      <Tooltip title="Editar">
      <Button
        type="primary"
        onClick={() => console.log('editar')}
      >
        <EditOutlined />
      </Button>
      </Tooltip>,
      <Button
        type="danger"
        onClick={() => console.log('desactivar')}
      >
        <StopOutlined  />
        
      </Button>,
      <Button
        type="danger"
        onClick={() => console.log('eliminar')}
      >
        <DeleteOutlined  />
      </Button>,
    ]}
  >
    <List.Item.Meta
      title={`
                      ${menu.title ? menu.title : ".."}
                  `}
      description={menu.url}
    />
  </List.Item>
  );
}
