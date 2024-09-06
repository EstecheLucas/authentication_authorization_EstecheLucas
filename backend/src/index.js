import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { PORT } from '../config/config.js';
import { router } from '../routes/index.routes.js';
const app = express();

app.use(express.json());

app.use(cors({ 
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(morgan('dev'));

app.use(router)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
