import React from "react";
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import { Layout, Menu } from "antd";
import { TrophyOutlined     } from '@ant-design/icons';
import "./LayoutBasic.scss";

export default function LayoutBasic(props){
    const { routes } = props;
    const { Header, Content, Footer } = Layout;    
    return(
        <Layout>
        <Header className="layout-basic__header">
            <img src="https://cdn.nba.com/logos/nba/nba-logoman-75-word_white.svg"/>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="players">
                    <Link to={"/players"}>
                        <TrophyOutlined   />
                        <span className="nav-text">Jugadores</span>
                    </Link>
                </Menu.Item>                                  
                <Menu.Item key="leaders">
                    <Link to={"/leaders"}>
                        <TrophyOutlined   />
                        <span className="nav-text">Clasificación</span>
                    </Link>
                </Menu.Item>  
                <Menu.Item key="games">
                    <Link to={"/games"}>
                        <TrophyOutlined   />
                        <span className="nav-text">Resultados</span>
                    </Link>
                </Menu.Item>                          
            </Menu>
        </Header>                
        <Content className="layout-basic__content">
                        <LoadRoutes routes={routes}/>
                    </Content>            
        <Footer className="layout-basic__footer">..Hola que haces..</Footer>
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