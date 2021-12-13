const express = require("express");
const MenuController = require('../controllers/menu');

const md_auth = require("../middleware/authenicated");

const api = express.Router();

api.post("/add-menu", [md_auth.ensureAuth], MenuController.addMenu);
api.get("/get-menus", [md_auth.ensureAuth], MenuController.getMenus);
api.post("/edit-menu", [md_auth.ensureAuth], MenuController.updateMenu);




module.exports = api;