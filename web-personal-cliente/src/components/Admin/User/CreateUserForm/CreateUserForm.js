import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Form,
  Icon,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
  message,
} from "antd";
import { useDropzone } from "react-dropzone";
import { UserOutlined, MailFilled } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  signUpAdminApi
} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";
//import {getAvatarApi} from '../../../../api/user';
import "./CreateUserForm.scss";

export default function CreateUserForm(props) {
  const { setmodalCollapsed,setReloadUsers } = props;
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    role: "",
    password:"",
    repetPassword:""
  });

  const createUser = (e) =>{
    e.preventDefault();
    const token = getAccessToken();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repetPassword) {
      if (userUpdate.password !== userUpdate.repetPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que se iguales.",
        });
      }
      console.log(userUpdate);
    }
    if (!userUpdate.name || !userUpdate.lastName || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios.",
      });
      return;
    }


    signUpAdminApi(token, userUpdate).then((result) => {
      notification["success"]({
        message: result.message,
      });
      setmodalCollapsed(false);
      setReloadUsers(true);
    });

  }

  return (
    <div className="edit-user-form">
      <CreateForm
      createUser={createUser}
      userData={userData}
      setUserData={setUserData}
      />
    </div>
  );
}

function CreateForm(props) {
  const { createUser,userData,setUserData } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }              
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellido"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }                  
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailFilled />}
              placeholder="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }               
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccione un rol"
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e })}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviwer">Revisor</Option>
              
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              type="password"
              placeholder="contraseña"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}              
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              value={userData.repetPassword}
              onChange={(e) => setUserData({ ...userData, repetPassword: e.target.value })}              
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" className="btn-submit" onClick={createUser}>
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
