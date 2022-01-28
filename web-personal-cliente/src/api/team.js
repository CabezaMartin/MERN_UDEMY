import { basePath, apiVersion } from "./config";

export function getTeam(token) {
    const url = `${basePath}/${apiVersion}/get-teams`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
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

export function getPlayersTeam(teamId){
    const url = `${basePath}/${apiVersion}/get-players-team?teamId=${teamId}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
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

export function getState(season){
    const url = `${basePath}/${apiVersion}/get-teamsApi/${season}`;
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
export function getScoreboard(gameDate){
    const url = `${basePath}/${apiVersion}/get-scoreboard/${gameDate}`;
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
export function getBoxScore(gameId){
    const url = `${basePath}/${apiVersion}/get-boxscore?gameId=${gameId}`;
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
export function getPlayersState(){
    const url = `${basePath}/${apiVersion}/get-players-state`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
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