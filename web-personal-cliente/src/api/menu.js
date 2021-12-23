import { basePath, apiVersion } from "./config";

export function addMenu(data, token) {
    const url = `${basePath}/${apiVersion}/add-menu`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
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
            if (result.menu) {
                return {
                    ok: 200,
                    message: "Menu creado exitosamente"
                };
            }
            return {
                ok: false,
                message: result.message
            }
        }).catch(err => {
            return { ok: false, message: err.message }
        })
}

export function getMenus(token) {
    const url = `${basePath}/${apiVersion}/get-menus`;
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

export function editMenuApi(data, token,menuId) {
    const url = `${basePath}/${apiVersion}/edit-menu${menuId}`;
    const params = {
        method: "PUT",
        body: JSON.stringify(data),
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
            if (result.menu) {
                return {
                    ok: 200,
                    message: "Menu editado exitosamente"
                };
            }
            return {
                ok: false,
                message: result.message
            }
        }).catch(err => {
            return { ok: false, message: err.message }
        })
}
