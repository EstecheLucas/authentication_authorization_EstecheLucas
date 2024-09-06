import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import {connectionDB} from "./database.js"

const app = express();


const PORT = process.env.PORT || 3000;
app.use(express.json());

// Middlewares 
app.use(cors({ // Permitir solicitudes desde el front-end
    origin: [
        'http://localhost:5173',
        'http://localhost:3000/',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Habilitar envío de cookies
}));

app.use(morgan('dev'));


app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true, 
      
    }
}));

app.post('/register', async (req, res) => {

    
    try {
        const { username, password } = req.body;
        const connection = await connectionDB();
        await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        connection.end();
        res.status(200).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});





app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const connection = await connectionDB();
        
        
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
       
        if (rows.length === 0) {
            connection.end();
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        
        const user = rows[0];
        
    
        if (user.password !== password) { 
            connection.end();
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        console.log(req.session)

        connection.end();
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});




app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.clearCookie('connect.sid'); 

        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
});





app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`))






