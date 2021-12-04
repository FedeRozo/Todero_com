const Database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const app = require('./app/app');
const cors= require ('cors');

Database.connect();
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(CONFIG.PORT, function(error){
    if (error) return console.log(error);
    console.log('Servidor corriendo en el puerto: ' + CONFIG.PORT );
});
