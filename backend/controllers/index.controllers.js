import jwt from 'jsonwebtoken';
import { connectionDB } from '../src/database.js';
import { JWT_SECRET } from '../config/config.js';

// Registro de usuario
export const registerUser = async (req, res) => {
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
};

// Login y generación de JWT
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const connection = await connectionDB();
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        connection.end();

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = rows[0];
        if (user.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '5h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Logout
export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};
