import React, { useState,useEffect } from "react";
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
  editMenuApi,
  deleteMenu,
  updateMenu
} from "../../../../api/menu";
import { getAccessToken } from "../../../../api/auth";
import "./EditMenuForm.scss";
import ColumnGroup from "rc-table/lib/sugar/ColumnGroup";

export default function EditMenu(props){
    const {menu,setmodalCollapsed,setReloadMenus} = props;
    const token = getAccessToken();
    const [menuData, setMenuData] = useState({
        title: menu.title,
        url: menu.url,
        ordinal: menu.ordinal,
        active: menu.active
      });    

      const cleanInput = () => {
        setMenuData({
          title: "",
          url: "",
          email: "",
          ordinal: "",
          active: "",
        });
      };
      useEffect(() => {
        setMenuData({
            title: menu.title,
            url: menu.url,
            ordinal: menu.ordinal,
            active: menu.active
        });
      }, [menu]);      

      const editMenu = async (e) => {
        console.log(e);
        console.log(menu._id);
        let updateMenu = menuData;
        //e.preventDefault();
        editMenuApi(updateMenu,token,menu._id).then((result) => {
            notification["success"]({
              message: result.message,
            });
            //setmodalCollapsed(false);
            //setReloadMenus(true);
          });
      };
      return (
        <div className="edit-menu-form">
            <EditMenuForm
                menuData={menuData}
                editMenu={editMenu}
                setMenuData={setMenuData}
            />
        </div>
      );
    
}

function EditMenuForm(props) {
    const { menuData,editMenu,setMenuData } = props;
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
          <Button type="primary" className="btn-submit" onClick={editMenu}>
            Editar Menu
          </Button>
        </Form.Item>
      </Form>
    );
  }