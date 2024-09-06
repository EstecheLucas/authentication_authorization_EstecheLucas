import {createConnection} from "mysql2/promise.js"
import {DB_USER, DB_NAME, DB_HOST} from "../config/config.js"
async function connectionDB() {
    try {
        const connection = await createConnection({
            host: "localhost",
            user: "root",
            database:"db_system"
        })
        return connection
    } catch (error) {
        console.error("ERROR AL CONECTAR A LA BASE DE DATOS", error)
    }
}

export {connectionDB}








