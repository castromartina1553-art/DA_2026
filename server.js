import express from 'express';
import mongoose from 'mongoose';//luego de descargar el mongoose, se importa con import
import config from './config.js';
import { configureRouter } from './api/router.js'; // server donde arranca el servidor
import { configureProduRouter } from './api/produ_router.js'; // server donde arranca el servidor
import './dependencies.js';
import errorMiddleware from './middlewares/errors_middleware.js';
import checkAuthorizationTokenMiddleware from './middlewares/check_authorization_token_middleware.js';
import logMiddleware from './middlewares/log_middleware.js';
//import bcrypt from 'bcrypt';

//console.log ('hash de 1234:', await bcrypt.hash('1234', 10));

const app = express();

app.use(express.json()); //decodificame los json
app.use(logMiddleware); //usa el middleware de log
app.use(checkAuthorizationTokenMiddleware); //usa el middleware de check authorization token

const apiRouter = express.Router();
app.use('/api', apiRouter); //usa el router de api
configureRouter(apiRouter); //configura el router de api
configureProduRouter(apiRouter); //configura el router de productos

app.use(errorMiddleware); //usa el middleware de errores

//conectate con mongodb, si se conecta bien, imprime el mensaje, sino imprime el error
try{ //el try (intenta) conectarse y si no puede va al catch
    await mongoose.connect(config.dbConnection); // el await es conectar con funciones asincronicas
    console.log('Conectado a MongoDB');

    app.listen(config, () => {
        console.log(`Server is running on http://localhost:${config.port}`);
    });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
};