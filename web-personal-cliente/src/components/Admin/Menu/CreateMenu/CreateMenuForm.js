import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification
} from "antd";
import { UserOutlined, IeOutlined,FieldBinaryOutlined,FontSizeOutlined } from "@ant-design/icons";
import {
  addMenu
} from "../../../../api/menu";
import { getAccessToken } from "../../../../api/auth";
import "./CreateMenuForm.scss";
import ColumnGroup from "rc-table/lib/sugar/ColumnGroup";

export default function CreateMenuForm(props){
    const {setmodalCollapsed,setReloadMenus} = props;
    const [menuData, setMenuData] = useState({
        title: "",
        url: "",
        ordinal: "",
        active: ""
      });    

      const createMenu = (e) =>{
        e.preventDefault();
        console.log(e);
        console.log(menuData);
        const token = getAccessToken();
        let menuUpdate = menuData;
        
        if(menuUpdate.title && menuUpdate.ordinal && menuUpdate.url){

        }else{
            notification["error"]({
                message: "Los datos son obligatirios"
            })
            return;
        }

        addMenu(menuUpdate,token).then((result=>{
            notification["success"]({
                message: result.message,
              });
              setmodalCollapsed(false);
              setReloadMenus(true);
        }));
      }  

      return (
        <div className="edit-menu-form">
            <MenuForm
                menuData={menuData}
                createMenu={createMenu}
                setMenuData={setMenuData}
            />
        </div>
      );
    
}

function MenuForm(props) {
    const { menuData,createMenu,setMenuData } = props;
    const { Option } = Select;


    return (
      <Form className="form-edit">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<FontSizeOutlined />}
                placeholder="Titulo"
                value={menuData.title}
                onChange={(e) =>
                    setMenuData({ ...menuData, title: e.target.value })
                }              
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<IeOutlined />}
                placeholder="Url"
                value={menuData.url}
                onChange={(e) =>
                    setMenuData({ ...menuData, url: e.target.value })
                }                  
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<FieldBinaryOutlined />}
                placeholder="Ordinal"
                value={menuData.ordinal}
                onChange={(e) =>
                    setMenuData({ ...menuData, ordinal: e.target.value })
               }               
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Select
                placeholder="Activo"
                value={menuData.active}
                onChange={(e) => setMenuData({ ...menuData, active: e })}
              >
                <Option value="true">true</Option>
                <Option value="false">false</Option>
               
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" className="btn-submit" onClick={createMenu}>
            Crear Menu
          </Button>
        </Form.Item>
      </Form>
    );
  }