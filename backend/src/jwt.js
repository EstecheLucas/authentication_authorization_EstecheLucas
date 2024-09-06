import jwt from 'jsonwebtoken';

import { SECRET } from '../config/config.js';

export function generarToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' }); 
}

export function verificarToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
