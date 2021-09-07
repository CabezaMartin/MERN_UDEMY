const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = 'a3f4c941-6232-4e58-b634-f923f39e5a4b';

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "No tiene autorizacion" });
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRET_KEY);
        if (payload.exp <= moment.unix()) {
            return res
                .status(404)
                .send({ message: "El tokn ha expirado" });
        }
    } catch (ex) {
        console.log(ex);
        return res
            .status(404)
            .send({ message: "Token no valido" });
    }
    req.user = payload;
    next();
};