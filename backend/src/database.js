import express from 'express';
import mysql from 'mysql2';

const app = express();


// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
host: 'localhost',  
user: 'root',         // Tu usuario de MySQL
database: 'db_system', // Nombre de la base de datos
});