import express from 'express';
import { configureRouter } from './api/router.js';
import './dependencies.js';

const app = express();
const PORT = 3000;

app.use(express.json()); //decodificame los json

configureRouter(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});