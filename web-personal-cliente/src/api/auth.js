import { basePath, apiVersion } from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';


export function getAccessToken() {
    
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken || accessToken === null || accessToken === "null" || accessToken==="undefined") {
        return null;

    }

    return willExpireToken(accessToken) ? null : accessToken;

    //return accessToken;
}

export function getRefreshToken() {
    
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken || refreshToken === null) {
        return null;

    }

    return willExpireToken(refreshToken) ? null : refreshToken;

    //return accessToken;
}

export function refreshToken(refreshToken) {
    
    const url = `${basePath}/${apiVersion}/refresh-access-token`;
    const bodyObj = {
        "refreshToken": refreshToken
    }
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    };
    return fetch(url, params)
        .then(response => {
            if (response.status !== 200) {
                return null;
            }
            return response.json();
        })
        .then(result => {
            if (!result) {
                //DESLOGUEAR AL USUARIO
                logout();
            } else {
                const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
        })

}

export function logout() {
    
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}


function willExpireToken(token) {
    
    const second = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + second) / 1000;
    return now > exp;
    //console.log(metaToken);
}