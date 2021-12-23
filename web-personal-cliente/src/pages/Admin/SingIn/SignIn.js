import React from 'react';
import "./SingIn.scss";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/png/nba.png";
import RegisterForm from '../../../components/Admin/RegisterForm/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm/LoginForm';
import {getAccessToken} from "../../../api/auth";

export default function SignIn() {
    const { Content } = Layout;
    const { TabPane } = Tabs;
    
    if(getAccessToken()){
        return <Redirect to="/admin"/>
    }

    return ( <Layout className = "sign-in">
            <Content className = "sign-in__content" >
                <h1 className = "sign-in__content-logo" >
                    <img src = { Logo } alt = "Margarita"/>
                </h1> 
                <div className = "sign-in__content-tabs">
                    <Tabs type = "card" >
                        <TabPane tab = { < span > Entrar </span>} key="1">
                           <LoginForm/>
                        </TabPane> 
                        <TabPane tab = { < span > Nuevo usuario </span>} key="2"> 
                            <RegisterForm/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
            </Layout>
            )
}