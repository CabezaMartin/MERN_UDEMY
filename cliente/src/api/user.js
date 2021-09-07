import { basePath, apiVersion } from "./config";

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    //console.log(data)
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.user) {
                return {
                    ok: 200,
                    message: "Usuario creado correctamente"
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

export function signInApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    return fetch(url, params)
        .then(response => {
            //console.log(Response);
            return response.json();
        })
        .then(result => {
            //console.log('RESULT API SIGINIDAPI' + result);
            return result;
        }).catch(err => {
            return { ok: false, message: err.message }
        })

}

export function getUsersApi(token) {
    const url = `${basePath}/${apiVersion}/users`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        }
    };
    return fetch(url, params)
        .then(response => {
            //console.log(Response);
            return response.json();
        })
        .then(result => {
            //console.log('RESULT API SIGINIDAPI' + result);
            return result;
        }).catch(err => {
            return { ok: false, message: err.message }
        })

}

export function getUsersActiveApi(token, status) {
    const url = `${basePath}/${apiVersion}/users-active?active=${status}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        }
    };
    return fetch(url, params)
        .then(response => {
            //console.log(Response);
            return response.json();
        })
        .then(result => {
            //console.log('RESULT API SIGINIDAPI' + result);
            return result;
        }).catch(err => {
            return { ok: false, message: err.message }
        })

}

export function uploadAvatarApi(token, avatar, userId) {
    const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

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

export function updateUserApi(token, user, userId) {
    const url = `${basePath}/${apiVersion}/update-user/${userId}`;
    const params = {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };

    //console.log(data)
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

export function editUserApi(data) {
    const url = `${basePath}/${apiVersion}/edit-user`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    //console.log(data)
    return fetch(url, params)
        .then(response => {
            console.log(`1 ${response}`);
            return response.json();
        })
        .then(result => {
            console.log(`2 ${result}`);
            if (result.user) {
                return {
                    ok: 200,
                    message: "Usuario editado correctamente"
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

export function getAvatarApi(avatarName) {
    const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

    return fetch(url)
        .then(response => {
            return response.url;
        }).catch(err => {
            return err.message
        })

}

export function activeDesactiveUserApi(token, user, userId) {
    const url = `${basePath}/${apiVersion}/active-user/${userId}`;
    const params = {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };

    //console.log(data)
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

export function deleteUserApi(token, userId) {
    const url = `${basePath}/${apiVersion}/delete-user/${userId}`;
    const params = {
        method: "POST",
        body: JSON.stringify({}),
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

export function signUpAdminApi(token, data) {
    const url = `${basePath}/${apiVersion}/sing-up-admin`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };
    //console.log(data)
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.user) {
                return {
                    ok: 200,
                    message: "Usuario creado correctamente"
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