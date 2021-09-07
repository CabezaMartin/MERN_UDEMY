//imports
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORTDB } = require('./config');


//conexion a la base de datos mongoDb, MernMartinProyect no esta definido pero lo crea 
mongoose.set("useFindAndModify", false);
mongoose.connect(`mongodb://${IP_SERVER}:${PORTDB}/MernMartinProyect`, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('La conexión a la DB es correcta');
        app.listen(port, () => {
            console.log("################");
            console.log("### API REST ###");
            console.log("################");
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
        })
    }
});