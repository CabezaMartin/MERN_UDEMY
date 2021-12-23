import React, { useState, useEffect, createContext } from "react";
import { getAccessToken, getRefreshToken, logout, refreshToken } from '../api/auth';
import jwtDecode from 'jwt-decode';


export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    useEffect(()=>{
        checkUserLogin(setUser);
    },[]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    //console.log(props);
}

function checkUserLogin(setUser){
    const accessToken = getAccessToken();

    if(!accessToken){
        const refToken = getRefreshToken();
        if(!refToken){
            logout();
            setUser({
                user:null,
                isLoading:false
            });
        }else{
            refreshToken(refToken);
        }
    }else{
        setUser({
            isLoading:false,
            user:jwtDecode(accessToken)
        });
    }
}

