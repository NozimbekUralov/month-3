import { serverConfig } from "@/utils/config";
import { ConnectionOptions, createConnection, Connection } from "mysql2/promise"

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = serverConfig;

class ConnectionError extends Error {
    constructor() {
        super("DB connection is not initialized.");
    }
}


class MYSQL {
    private accessOpts: ConnectionOptions;
    private conn?: Connection;
    isInitialized = false;


    constructor({ host, port, user, password, database }: ConnectionOptions) {
        this.accessOpts = {
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        }
    }

    async init(): Promise<Connection> {
        if (this.isInitialized) {
            if (!this.conn) throw new ConnectionError();
            return this.conn;
        }
        const conn = await createConnection(this.accessOpts);
        this.conn = conn;
        this.isInitialized = true;
        return conn;
    }
    async query<EntityType>(query: string, values?: any[]): Promise<EntityType> {
        if (!this.conn) throw new ConnectionError();
        let data;
        if (values) data = await this.conn.query(query, values);
        else data = await this.conn.query(query);
        const [rows] = data;
        return rows as EntityType;
    }
    async destroy() {
        if (this.conn) this.conn.destroy();
    }
}

export const DB = new MYSQL({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});
