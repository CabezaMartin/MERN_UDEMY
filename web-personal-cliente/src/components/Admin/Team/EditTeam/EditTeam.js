import React, { useState, useEffect, useCallback } from "react";
import {  Avatar,  Form,  Icon,  Input,  Select,  Button,  Row,  Col,  notification,  message,} from "antd";
import { useDropzone } from "react-dropzone";
import { UserOutlined, MailFilled } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {  uploadAvatarApiNba, getLogoApi, updateTeamApi} from "../../../../api/team";
import { getAccessToken } from "../../../../api/auth";
//import {getAvatarApi} from '../../../../api/user';
import "./EditTeam.scss";

export default function EditTeam(props) {
  const { team, setmodalCollapsed,setReloadTeams } = props;
  const [avatar, setAvatar] = useState(null);
  const [teamData, setTeamData] = useState({
    teamName: team.teamName,
    teamId: team.teamId,
    conference: team.conference,
    avatar: team.avatar
  });

  const cleanInput = () => {
    setTeamData({
      teamName: "",
      teamId: "",
      conference: "",
      avatar: ""
    });
  };
  useEffect(() => {
    setTeamData({
      teamName: team.teamName,
      teamId: team.teamId,
      conference: team.conference,
      avatar: team.avatar
    });
  }, [team]);
 useEffect(() => {
    if (team.avatar) {
      getLogoApi(team.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [team]);
  useEffect(() => {
    if (avatar) {
      setTeamData({ ...teamData, avatar:avatar.file });
    }
  }, [avatar]);

  const updateTeam = async (e) => {
    e.preventDefault();
    const token = getAccessToken();
    let teamUpdate = teamData;


    if (!teamUpdate.conference) {
      notification["error"]({
        message: "La conferencia es obligatoria.",
      });
      return;
    }

    if (typeof teamUpdate.avatar === "object") {
      uploadAvatarApiNba(token, teamUpdate.avatar, team._id).then((response) => {
        teamUpdate.avatar = response.avatarName;
        updateTeamApi(token, teamUpdate, team._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setmodalCollapsed(false);
          setReloadTeams(true);
        });
      });
    }else{
      updateTeamApi(token, teamUpdate, team._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setmodalCollapsed(false);
        setReloadTeams(true);
      });
    }
  };
  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        teamData={teamData}
        setTeamData={setTeamData}
        updateTeam={updateTeam}
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
  const { teamData, setTeamData, updateTeam } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccione una conferencia"
              onChange={(e) => setTeamData({ ...teamData, conference: e })}
              value={teamData.conference}
            > 
              <Option value="west">Oeste</Option>
              <Option value="east">Este</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" className="btn-submit" onClick={updateTeam}>
          Actualizar Equipo
        </Button>
      </Form.Item>
    </Form>
  );
}
