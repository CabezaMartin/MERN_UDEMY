const jwt = require("jwt-simple");
const moment = require("moment");


const SECRET_KEY = 'a3f4c941-6232-4e58-b634-f923f39e5a4b';


exports.createAccessToken = (user) => {
    const payLoad = {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createToken: "",
        exp: moment().add(3, 'hours').unix()
    };

    return jwt.encode(payLoad, SECRET_KEY);
};

exports.createRefreshToken = (user) => {
    const payLoad = {
        id: user._id,
        exp: moment().add(30, "days").unix()
    };
    return jwt.encode(payLoad, SECRET_KEY);
};

exports.decodedToken = (token) => {
    return jwt.decode(token, SECRET_KEY);
}