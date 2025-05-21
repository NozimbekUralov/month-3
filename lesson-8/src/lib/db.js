const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PORT, DB_DATABASE, DB_PASSWORD } = require('./config');

class DB {
    #conn
    constructor() {
        this.init = this.init.bind(this);
    }

    async init(tables = [{}]) {
        this.#conn = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            port: DB_PORT,
            database: DB_DATABASE,
            password: DB_PASSWORD
        });

        await this.#conn.connect();

        const [dbTables] = await this.#conn.query('show tables');
        const dbTablesNames = dbTables.map(table => Object.values(table)[0]);
        const exec = tables.map(table => (
            {
                exists: dbTablesNames.includes(Object.keys(table)[0]),
                name: Object.keys(table)[0]
            }
        ))
        if (tables.length && !exec.every(table => table.exists == true)) {
            for (let i = 0; i < exec.length; i++) {
                if (!exec[i].exists) await this.#conn.query(Object.values(tables[i])[0]);
            }
        }
    }
}

module.exports = new DB;
