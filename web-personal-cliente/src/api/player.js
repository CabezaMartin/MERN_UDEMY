import { basePath, apiVersion } from "./config";

export function getPlayerInfo(playerId) {
    const url = `${basePath}/${apiVersion}/get-player-info?playerId=${playerId}`;
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
