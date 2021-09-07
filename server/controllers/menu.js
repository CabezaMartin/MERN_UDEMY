const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const Menu = require("../models/menu");
//crear Menu
function addMenu(req, res) {
    const menu = new Menu();
    const { title, url, ordinal, active } = req.body;
    menu.title = title.toLowerCase();
    menu.url = url.toLowerCase();
    menu.ordinal = ordinal;
    menu.active = active;

    if (!title || !url || !ordinal) {
        res.status(404).send({ message: "El titulo, url y ordinal son obligatorias" });
    } else {
        menu.save((err, menuStored) => {
            if (err) {
                res.status(500).send({ message: "Error el menu ya existe" });
            } else {
                if (!menuStored) {
                    res.status(404).send({ message: "Error al crear el menu" })
                } else {
                    res.status(200).send({ menu: menuStored })
                };
            }
        });

    }
}

function getMenus(req, res) {
    Menu.find()
        .sort({ ordinal: "asc" })
        .exec((err, menuStored) => {
            if (err) {
                res.status(404).send({ message: "Error en el server" })
            } else {
                if (!menuStored) {
                    res.status(500).send({ message: "No existen menus" })
                } else {
                    res.status(200).send({ menu: menuStored })
                }
            }
        })
}


module.exports = {
    addMenu,
    getMenus
};