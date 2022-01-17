import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Layout } from "antd";

import "./LayoutBasic.scss";

export default function LayoutBasic(props){
    const { routes } = props;
    const {  Content, Footer } = Layout;    
    return(
        <Layout>
            <h2>Menu Sider basic users</h2>
            <Layout>
                <Content>
                     <LoadRoutes routes={routes}/>
                </Content>
                <Footer>..Hola que haces..</Footer>
            </Layout>
        </Layout>
    );
}
function LoadRoutes(props){
    
    console.log(props);
    const { routes } = props;
    console.log(routes);

    return (
        <Switch>
            {
                routes.map((route,index)=>(
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    );
  }