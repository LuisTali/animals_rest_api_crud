//Lo que antes era const {express} = require('express') ahora gracias a babel es =>
import express from 'express'; 
import config from './config'

//Importo las Rutas de Animales
import animalsRoutes from './routes/animals'

const app = express();

//setting
let port;
app.set('port', config.port);

//Parse json obtenido cuando req.body para los parametros
app.use(express.json())

//Seteo la base de las rutas de animales
app.use('/animals',animalsRoutes);

export default app;