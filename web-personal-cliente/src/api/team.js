import { basePath, apiVersion } from "./config";

export function getTeam(token) {
    const url = `${basePath}/${apiVersion}/get-teams`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        }).catch(err => {
            return { ok: false, message: err.message }
        })
}

export function uploadAvatarApiNba(token, avatar, teamId) {
    const url = `${basePath}/${apiVersion}/upload-logo/${teamId}`;

    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name)
    const params = {
        method: "PUT",
        body: formData,
        headers: {
            "Authorization": token
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        }).catch(err => {
            return err.message
        })
}

export function getLogoApi(avatarName) {
    const url = `${basePath}/${apiVersion}/get-logo/${avatarName}`;

    return fetch(url)
        .then(response => {
            return response.url;
        }).catch(err => {
            return err.message
        })

}

export function updateTeamApi(token, teamData, teamId){
    const url = `${basePath}/${apiVersion}/update-team/${teamId}`;

    const params = {
        method: "PUT",
        body: JSON.stringify(teamData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    }).catch(err => {
        return err.message
    })
}

export function getPlayersTeam(token,teamId){
    const url = `${basePath}/${apiVersion}/get-players-team?teamId=${teamId}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        }).catch(err => {
            return { ok: false, message: err.message }
        })

}

export function getState(){
    const url = `${basePath}/${apiVersion}/get-teamsApi`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        }).catch(err => {
            return { ok: false, message: err.message }
        })    
}