const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const { exists } = require("../models/user");
//crear usuario
function signUp(req, res) {
    const user = new User();
    const { /*name, lastName,*/ email, password, repeatPassword } = req.body;
    user.email = email.toLowerCase();
    user.role = 'admin';
    user.active = false;

    if (!password || !repeatPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias" });
    } else {
        if (password !== repeatPassword) {
            res.status(404).send({ message: "Las contraseñas deben ser iguales" });
        } else {
            bcrypt.hash(password, null, null, (err, hash) => {
                if (err) {
                    res.status(500).send({ message: "Error al encriptar la contraseña" });
                } else {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: "Error el usuario ya existe" });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: "Error al crear el usuario" })
                            } else {
                                res.status(200).send({ user: userStored })
                            };
                        }
                    });
                }
            })
        }
    }

}

function signIn(req, res) {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Usuario no encontrado" });
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ message: "Error del servidor" });
                    } else if (!check) {
                        res.status(404).send({ message: "Usuario o contraseña incorrecta" });
                    } else {
                        if (!userStored.active) {
                            res.status(200).send({ code: 200, message: "Usuario no activo" });
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            })
                        }
                    }
                })
            }
        }
    });
}

function getUsers(req, res) {
    User.find().then(users => {
        if (!users) {
            res.status(404).send({ message: "No se ha encontrado ningun usuario." });
        } else {
            res.status(200).send({ users });
        }
    })
}

function getUsersActive(req, res) {
    const query = req.query;
    User.find({ active: query.active }).then(users => {
        if (!users) {
            res.status(404).send({ message: "No se ha encontrado ningun usuario activo." });
        } else {
            res.status(200).send({ users });
        }
    })
}

function editUser(req, res) {
    const { active, role, name, lastName, email, password, repetPassword } = req.body;
    const query = { email: email };

    //
    if (!password || !repetPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias" });
    } else {
        if (password !== repetPassword) {
            res.status(404).send({ message: "Las contraseñas deben ser iguales" });
        } else {
            bcrypt.hash(password, null, null, (err, hash) => {
                if (err) {
                    res.status(500).send({ message: "Error al encriptar la contraseña" });
                } else {
                    User.findOneAndUpdate(query, {
                        name: name,
                        lastName: lastName,
                        password: hash,
                        role: role
                    }).then(user => {
                        console.log(user);
                        if (!user) {
                            res.status(404).send({ message: "No se ha encontrado ningun usuario activo." });
                        } else {
                            res.status(200).send({ user });
                        }
                    })
                }
            })
        }
    }
    //
}

function uploadAvatar(req, res) {
    const params = req.params;

    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!userData) {
                res.status(404).send({ message: "No se ha encontrado ningun usuario" });
            } else {
                let user = userData;

                if (req.files) {
                    let filePath = req.files.avatar.path;
                    console.log(filePath);
                    let fileSplit = filePath.split("\\");
                    console.log(fileSplit);
                    let fileName = fileSplit[2];
                    console.log(fileName);
                    let extSplit = fileName.split(".");
                    console.log(extSplit);
                    let fileExt = extSplit[1];


                    if (fileExt !== "png" && fileExt !== "jpg") {
                        res.status(400)
                            .send({
                                message: "La extensión de la imagen no es válida"
                            });
                    } else {
                        user.avatar = fileName;
                        User.findByIdAndUpdate({ _id: params.id },
                            user, (err, userResult) => {
                                if (err) {
                                    res.status(500).send({
                                        message: "Error del servidor"
                                    })
                                } else {
                                    if (!userResult) {
                                        res.status(404).send({
                                            message: "No se ha encontrado ningun usuario"
                                        });
                                    } else {
                                        res.status(200).send({ avatarName: fileName });
                                    }
                                }
                            });
                    }


                }
                //console.log(req.files);
            }
        }
    })

}

function getAvatar(req, res) {
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;

    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(404).send({ message: "El avatar no existe" });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}

function updateUser(req, res) {

    let userData = req.body;
    console.log(userData);
    userData.email = req.body.email.toLowerCase();
    const params = req.params;
    if (userData.password) {
        bcrypt.hash(userData.password, null, null, (err, hash) => {
            if (err) {
                res.status(500).send({ message: "Error al encriptar la contraseña" });
            } else {
                userData.password = hash;
                User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
                    if (err) {
                        res.status(500).send({ message: "Error del servidor." });
                    } else {
                        if (!userUpdate) {
                            res.status(404)
                                .send({ message: "No se ha encontrado ningun usuario" });
                        } else {
                            res.status(200).send({ message: "Usuario actualizado correctamente" })
                        }
                    }
                })
            }
        })
    } else {
        User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
            if (err) {
                res.status(500).send({ message: "Error del servidor." });
            } else {
                if (!userUpdate) {
                    res.status(404)
                        .send({ message: "No se ha encontrado ningun usuario" });
                } else {
                    res.status(200).send({ message: "Usuario actualizado correctamente" })
                }
            }
        })
    }
}

function activeDesactiveUser(req, res) {

    let userData = req.body;
    const params = req.params;
    User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!userUpdate) {
                res.status(404)
                    .send({ message: "No se ha encontrado ningun usuario" });
            } else {
                res.status(200).send({ message: "Usuario actualizado correctamente" })
            }
        }
    })
}

function deleteUser(req, res) {

    const params = req.params;
    User.findOneAndDelete({ _id: params.id }, (err, userUpdate) => {
        console.log(userUpdate);
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!userUpdate) {
                res.status(404)
                    .send({ message: "No se ha encontrado ningun usuario" });
            } else {
                res.status(200).send({ message: "Usuario borrado correctamente" })
            }
        }
    })
}

function signUpAdmin(req, res) {
    const user = new User();
    const { name, lastName, email, password, repetPassword, role } = req.body;
    user.email = email.toLowerCase();
    user.role = role;
    user.active = name;
    user.active = lastName;
    user.active = true;

    if (!password || !repetPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias" });
    } else {
        if (password !== repetPassword) {
            res.status(404).send({ message: "Las contraseñas deben ser iguales" });
        } else {
            bcrypt.hash(password, null, null, (err, hash) => {
                if (err) {
                    res.status(500).send({ message: "Error al encriptar la contraseña" });
                } else {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: "Error el usuario ya existe" });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: "Error al crear el usuario" })
                            } else {
                                res.status(200).send({ user: userStored })
                            };
                        }
                    });
                }
            })
        }
    }

}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive,
    editUser,
    uploadAvatar,
    getAvatar,
    updateUser,
    activeDesactiveUser,
    deleteUser,
    signUpAdmin
};