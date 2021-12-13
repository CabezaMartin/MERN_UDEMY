//imports
const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require('./config');
//inicializo express
const app = express();


//Load routing
const userRouters = require('./routers/user');
const authRouters = require('./routers/auth');
const menuRouters = require('./routers/menu');
const nbaRouters = require('./routers/apiNba');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
//....

app.use(`/api/${API_VERSION}`, userRouters);
app.use(`/api/${API_VERSION}`, authRouters);
1
app.use(`/api/${API_VERSION}`, nbaRouters);

//exportar app en node
module.exports = app;