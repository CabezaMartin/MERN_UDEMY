import React, { useState } from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from "antd";
import MenuTop from '../components/Admin/MenuTop/MenuTop';
import MenuSider from '../components/Admin/MenuSider/MenuSider';
import "./LayoutAdmin.scss";
import AdminSignIn from "../pages/Admin/SingIn/SignIn";
import useAuth from "../hooks/useAuth";

import {getAccessToken, getRefreshToken} from '../api/auth';

export default function LayoutAdmin(props) {
    //debugger;
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const {user, isLoading} = useAuth();
    //console.log(user);
    //const user = null;
    if(!user && !isLoading){
        return (
            <>
            <Route path="/admin/login" component={AdminSignIn}/>
            <Redirect to="/admin/login"/>
            </>
        )
    }
    if (user && !isLoading) {
        return(
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed}/>
                <Layout className="layout-admin" style={{marginLeft:menuCollapsed?"80px":"200px"}}>
                    <Header className="layout-admin__header">
                        <MenuTop 
                            menuCollapsed={menuCollapsed} 
                            setMenuCollapsed={setMenuCollapsed}
                        />
                    </Header>
                    <Content className="layout-admin__content">
                         <LoadRoutes routes={routes}/>
                    </Content>
                    <Footer className="layout-admin__footer">..Hola que haces..</Footer>
                </Layout>
            </Layout>
        );        
    }
    return null;
}

function LoadRoutes(props){
    const { routes } = props;
    return (
        <Switch>
            {routes.map((route,index)=>(
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
  }