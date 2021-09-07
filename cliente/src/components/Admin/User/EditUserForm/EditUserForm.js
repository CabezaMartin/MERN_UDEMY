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
  editUserApi,
  getAvatarApi,
  updateUserApi,
  uploadAvatarApi,
} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";
//import {getAvatarApi} from '../../../../api/user';
import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setmodalCollapsed,setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });

  const cleanInput = () => {
    setUserData({
      name: "",
      lastName: "",
      email: "",
      role: "",
      avatar: "",
    });
  };
  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar:avatar.file });
    }
  }, [avatar]);

  const updateUser = async (e) => {
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

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setmodalCollapsed(false);
          setReloadUsers(true);
        });
      });
    }else{
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setmodalCollapsed(false);
        setReloadUsers(true);
      });
    }
  };
  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image,jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
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
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
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
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repetPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" className="btn-submit" onClick={updateUser}>
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
