import React, { useState,useEffect } from "react";
import "./ListMenus.scss";
import { EditOutlined,StopOutlined,DeleteOutlined, CheckOutlined,UserAddOutlined    } from "@ant-design/icons";
import { Tooltip ,  List, Button, Avatar, notification,  Modal as ModalAntd} from "antd";
import Modal from "../../../Admin/Modal";
import Menu from "../../../../pages/Admin/MenuWeb/MenuWeb";
import {getMenus,addMenu} from '../../../../api/menu';
import { getAccessToken } from "../../../../api/auth";
import ColumnGroup from "rc-table/lib/sugar/ColumnGroup";
import EditMenu from "../../../../components/Admin/Menu/EditMenu";
import CreateMenuForm from "../../../../components/Admin/Menu/CreateMenu";
const {confirm} = ModalAntd;

export default function ListMenus(props) {
  const [modalCollapsed, setmodalCollapsed] = useState(false);  
  const [modalTitle, setModalTitle] =  useState("");
  const [modalContent, setModalContent] =  useState(null);  
  const {menus,setReloadMenus} = props;
  //console.log("MENUS::::"+ JSON.stringify(menus));
  const token = getAccessToken();
  
  const createMenu = () =>{
    //console.log('MENU!¡!¡!¡!');
    setmodalCollapsed(!modalCollapsed)
    setModalTitle(`Nuevo Menu`);
    setModalContent(<CreateMenuForm
      setmodalCollapsed={setmodalCollapsed}
      setReloadMenus={setReloadMenus}
      />);
  }
  const editMenu = menu =>{
    console.log("1."+menu);
    setmodalCollapsed(!modalCollapsed)
    setModalTitle(`Editar ${menu.title ? menu.title : '...'}`);
    setModalContent(<EditMenu menu={menu}
       setmodalCollapsed={setmodalCollapsed}
       setReloadMenus={setReloadMenus}/>);
}
  return (

    <div className="list-menus">
      <div className="list-menus__header">
        <div className="list-menus__header-btn-add-user">
            <Button
              type="primary"
              onClick={() =>createMenu()}
              >        
              <UserAddOutlined />
              Nuevo menu
            </Button>
          </div>        
      </div>
      <MenuItems 
            menus={menus} 
            setReloadMenus = {setReloadMenus}
            editMenu={editMenu}
        />
      <Modal
        title={modalTitle}
        isVisible={modalCollapsed}
        setIsVisible={setmodalCollapsed}
      >
         {modalContent}
      </Modal>
    </div>
  );
}

function MenuItems(props) {
  const { menus,setReloadMenus,editMenu} = props;
    const token = getAccessToken();

   
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={menus}
      renderItem={menu => 
      <MenuItem 
        menu={menu} 
        editMenu={editMenu}
    />}
    />
  );
}

function MenuItem(props){
  const {menu,editMenu} = props;

  return(
    <List.Item
    actions={[
      <Tooltip title="Editar">
      <Button
        type="primary"
        onClick={() => editMenu(menu)}
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
