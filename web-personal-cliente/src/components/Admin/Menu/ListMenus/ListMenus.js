import React, { useState } from "react";
import "./ListMenus.scss";
import {  UserAddOutlined    } from "@ant-design/icons";
import {  Button, } from "antd";
import Modal from "../../../Admin/Modal";
import CreateMenuForm from "../../../../components/Admin/Menu/CreateMenu";

export default function ListMenus(props) {
  const [modalCollapsed, setmodalCollapsed] = useState(false);  
  const [modalTitle, setModalTitle] =  useState("");
  const [modalContent, setModalContent] =  useState(null);  
  const {setReloadMenus} = props;
  //console.log("MENUS::::"+ JSON.stringify(menus));
  //const token = getAccessToken();
  
  const createMenu = () =>{
    //console.log('MENU!¡!¡!¡!');
    setmodalCollapsed(!modalCollapsed)
    setModalTitle(`Nuevo Menu`);
    setModalContent(<CreateMenuForm
      setmodalCollapsed={setmodalCollapsed}
      setReloadMenus={setReloadMenus}
      />);
  }
/*  const editMenu = menu =>{
    console.log("1."+menu);
    setmodalCollapsed(!modalCollapsed)
    setModalTitle(`Editar ${menu.title ? menu.title : '...'}`);
    setModalContent(<EditMenu menu={menu}
       setmodalCollapsed={setmodalCollapsed}
       setReloadMenus={setReloadMenus}/>);
}*/
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
      <div>
            <h1>Estamos en Admin.</h1>
            <h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>            
        </div>
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

/*function MenuItems(props) {
  const { menus,editMenu} = props;
   
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
}*/

/*function MenuItem(props){
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
}*/
