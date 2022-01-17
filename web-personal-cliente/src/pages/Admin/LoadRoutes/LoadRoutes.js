import React, {useState,useEffect,} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch,Link} from 'react-router-dom';
export default function LoadRoutes(props){
    const { routes } = props;
    //console.log(routes);
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

