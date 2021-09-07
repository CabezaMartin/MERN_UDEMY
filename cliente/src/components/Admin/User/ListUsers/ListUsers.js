import React, { useState,useEffect } from "react";
import "./ListUsers.scss";
import { EditOutlined,StopOutlined,DeleteOutlined, CheckOutlined,UserAddOutlined    } from "@ant-design/icons";
import { Tooltip , Switch, List, Button, Avatar, notification,  Modal as ModalAntd} from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Admin/Modal";
//import User from "../../../../pages/Admin/Users/Users";
import {getAvatarApi,activeDesactiveUserApi,deleteUserApi} from '../../../../api/user';
import EditUserForm from "../../../../components/Admin/User/EditUserForm";
import CreateUserForm from "../../../../components/Admin/User/CreateUserForm";
import { getAccessToken } from "../../../../api/auth";

const {confirm} = ModalAntd;

export default function ListUsers(props) {
  const [modalCollapsed, setmodalCollapsed] = useState(false);
  const { usersActive, usersInactive,setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [modalTitle, setModalTitle] =  useState("");
  const [modalContent, setModalContent] =  useState(null);
  //const [modalSignUpVisible,setModalSignUpVisible] = useState(false)
  const token = getAccessToken();
/***********Elmiminar usuario con notification Confirm***************
  const deleteUser = user =>{
    const close1 = (user,b) => {
      if(b){
        deleteUserApi(token, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setReloadUsers(true)
        });
      }
    };
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" 
      size="small" 
      onClick={() => close1(user,true)}>
        Confirmar
      </Button>
    );
    notification.open({
      message: 'Eliminar usuario',
      description:
        'Desea eliminar el usuario?',
      btn,
      key,
      onClose: close1(user,false),
    });
  }
***************************************************/    
/**********Eliminar usuario Modal Antd*****************/
const deleteUser = user =>{
  confirm({
    title:"Eliminar Usuario",
    content:"Desea eliminar?",
    okText:"Eliminar",
    okType:"danger",
    cancelText:"Cancelar",
    onOk(){
      deleteUserApi(token, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReloadUsers(true)
      });      
    }
  });
}
/***************************************************/    

const creatUser = () =>{
  setmodalCollapsed(!modalCollapsed)
  setModalTitle(`Nuevo usuario`);
  setModalContent(<CreateUserForm
    setmodalCollapsed={setmodalCollapsed}
    setReloadUsers={setReloadUsers}
    />);
}


  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActives(!viewUsersActives)}
          />
          <span>
            {viewUsersActives ? "UsuariosActivos" : "Usuarios inactivos"}
          </span>
        </div>
        <div className="list-users__header-btn-add-user">
            <Button
              type="primary"
              onClick={() =>{creatUser()}}
              >        
              <UserAddOutlined />
              Nuevo usuario
            </Button>
          </div>        
      </div>
      {viewUsersActives ? (
        <UsersActive 
            usersActive={usersActive} 
            setmodalCollapsed = {setmodalCollapsed}
            modalCollapsed = {modalCollapsed}
            setModalTitle = {setModalTitle}
            setModalContent = {setModalContent}
            setReloadUsers = {setReloadUsers}
            deleteUser = {deleteUser}

        />
      ) : (
        <UsersInactive 
          usersInactive = {usersInactive}
          setReloadUsers={setReloadUsers}
          deleteUser = {deleteUser} />
      )}

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

function UsersActive(props) {
  const { usersActive, setmodalCollapsed, modalCollapsed,setModalContent,
     setModalTitle,setReloadUsers,deleteUser
    } = props;
    const token = getAccessToken();
    const editUser = user =>{
        //console.log("1."+user);
        setmodalCollapsed(!modalCollapsed)
        setModalTitle(`Editar ${user.name ? user.name : '...'} ${user.lastName ? user.lastName : '...'}`);
        setModalContent(<EditUserForm user={user}
           setmodalCollapsed={setmodalCollapsed}
           setReloadUsers={setReloadUsers}/>);
    }

    const desactiveUser = user =>{
      const body = {
        "active":false
      };
      activeDesactiveUserApi(token,body, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReloadUsers(true)
      });
    }
    
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={user => 
      <UserActive 
        user={user} 
        editUser={editUser} 
        desactiveUser={desactiveUser}
        deleteUser={deleteUser}/>}
    />
  );
}

function UserActive(props){
  const {user, editUser,desactiveUser,deleteUser} = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(()=>{
    if(user.avatar){
      getAvatarApi(user.avatar).then(response=>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
  },[avatar]);


  return(
    <List.Item
    actions={[
      <Tooltip title="Editar">
      <Button
        type="primary"
        onClick={() => editUser(user)}
      >
        <EditOutlined />
      </Button>
      </Tooltip>,
      <Button
        type="danger"
        onClick={() => desactiveUser(user)}
      >
        <StopOutlined  />
        
      </Button>,
      <Button
        type="danger"
        onClick={() => deleteUser(user)}
      >
        <DeleteOutlined  />
      </Button>,
    ]}
  >
    <List.Item.Meta
      avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
      title={`
                      ${user.name ? user.name : ".."}
                      ${user.lastName ? user.lastName : "..."}
                  `}
      description={user.email}
    />
  </List.Item>
  );
}

function UsersInactive(props) {
    const { usersInactive,setReloadUsers,deleteUser } = props;
    const token = getAccessToken();
    const activarUsuario = user =>{
      const body = {
        "active":true
      };
      activeDesactiveUserApi(token,body, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReloadUsers(true)
      });
    }

    return (
        <List
          className="users-active"
          itemLayout="horizontal"
          dataSource={usersInactive}
          renderItem={user => 
          <UserInactive 
            user={user} 
            activarUsuario={activarUsuario}
            deleteUser={deleteUser}/>}
        />
      );
}

function UserInactive(props){
  const {user,activarUsuario,deleteUser} = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(()=>{
    if(user.avatar){
      getAvatarApi(user.avatar).then(response=>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
  },[avatar]);  

  return (
    <List.Item
    actions={[
      <Button
        type="primary"
        onClick={() => activarUsuario(user)}
      >
        <CheckOutlined />
      </Button>,
      <Button
        type="danger"
        onClick={() => deleteUser(user)}
      >
        <DeleteOutlined  />
      </Button>,
    ]}
  >
    <List.Item.Meta
      avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
      title={`
                      ${user.name ? user.name : ".."}
                      ${user.lastName ? user.lastName : "..."}
                  `}
      description={user.email}
    />
  </List.Item>
  );
}
