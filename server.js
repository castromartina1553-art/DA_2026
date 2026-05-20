import express from 'express';
import mongoose from 'mongoose';//luego de descargar el mongoose, se importa con import
import config from './config.js';
import { configureRouter } from './api/router.js'; // server donde arranca el servidor
import './dependencies.js';

const app = express();
const PORT = 3000;

app.use(express.json()); //decodificame los json

//conectate con mongodb, si se conecta bien, imprime el mensaje, sino imprime el error
try{ //el try (intenta) conectarse y si no puede va al catch
    await mongoose.connect(config.dbConnection); // el await es conectar con funciones asincronicas, el mongoose.connect es una función asincrónica que se conecta a la base de datos, y el config.dbConnection es la cadena de conexión a la base de datos que se encuentra en el archivo config.js
    console.log('Conectadp a MongoDB');

    app.listen(config, () => {
        console.log(`Server is running on http://localhost:${config.port}`);
    });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

configureRouter(app);

