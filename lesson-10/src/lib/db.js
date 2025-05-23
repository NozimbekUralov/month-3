import c from "config"
import {createConnection} from "mysql2/promise"

export const db = await createConnection({
    host: c.get("DB_HOST"),
    database: c.get("DB_DATABASE"),
    user: c.get("DB_USERNAME"),
    password: c.get("DB_PASSWORD")
})