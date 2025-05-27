import { ResultSetHeader } from "mysql2/promise";
import { DB } from '@/lib/mysql'
import { Controller } from "tsoa";

class WriteError extends Error {
    constructor() {
        super("Filed to write data to database");
    }
}

export interface PaginationQuery {
    page: number;
    limit: number;
}

export class BaseService<Entity, CreateEntityType, UpdateEntityType> {
    private tableName: string;
    protected readonly db: typeof DB
    constructor(tableName: string, db: typeof DB) {
        this.tableName = tableName;
        this.db = db;
    }
    async create(data: CreateEntityType) {
        const query = `INSERT INTO ${this.tableName} SET ?`;
        const res = await this.db.query<ResultSetHeader>(query, [data]);
        if (!res.affectedRows) throw new WriteError();
        const result = {
            id: res.insertId,
            ...data
        }
        return result as Entity;
    };
    async update(id: number, data: UpdateEntityType) {
        const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
        const res = await this.db.query<ResultSetHeader>(query, [data, id]);
        if (!res.affectedRows) throw new WriteError();
        const result = await this.getById(id);
        return result as Entity;
    }
    async delete(id: number) {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const res = await this.db.query<ResultSetHeader>(query, [id]);
        return res.affectedRows > 0;
    }
    async getAll(data: PaginationQuery) {
        const query = `SELECT * FROM ${this.tableName} LIMIT ${data.limit} OFFSET ${(data.page - 1) * data.limit}`;
        const rows = await this.db.query<Entity[]>(query);
        return rows;
    }
    async getById(id: number) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const [data] = await this.db.query<[Entity]>(query, [id]);
        return data
    }
}

export class BaseController<
    Entity,
    CreateEntityType,
    UpdateEntityType,
    Service extends BaseService<Entity, CreateEntityType, UpdateEntityType>,
> extends Controller {
    protected readonly service: Service;
    constructor(service: Service) {
        super();
        this.service = service;
    }

    async CREATE(data: CreateEntityType) {
        return await this.service.create(data);
    }

    async UPDATE(id: number, data: UpdateEntityType) {
        return await this.service.update(id, data);
    }

    async GET_ALL(page: number, limit: number) {
        return await this.service.getAll({ page, limit });
    }

    async GET_BY_ID(id: number) {
        const result = await this.service.getById(id);
        if (!result) this.setStatus(404);
        return result
    }

    async DELETE(id: number) {
        const result = await this.service.delete(id);
        return { result }
    }
}