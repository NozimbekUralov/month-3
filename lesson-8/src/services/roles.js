const BaseService = require('./index');
const db = require('../lib/db');
const { ClientError } = require('../utils');

class RolesService extends BaseService {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.getOneByName = this.getOneByName.bind(this);
    }
    async getOneById(id) {
        const res = await db._conn.query('SELECT * FROM roles WHERE id = ?', [id]);
        return res[0];
    }

    async getOneByName(name) {
        const res = await db._conn.query('SELECT * FROM roles WHERE name = ?', [name]);
        return res[0];
    }

    async getAll({ page, limit }) {
        const res = await db._conn.query('SELECT * FROM roles LIMIT ? OFFSET ?', [limit, (page - 1) * limit]);
        return res[0]
    }

    async delete(id) {
        const role = await this.getOneById(id);
        if (!role.length) throw new ClientError('Role not found', 404);
        const [res] = await db._conn.query('DELETE FROM roles WHERE id = ?', [id]);
        return res.affectedRows;
    }

    async update(id, data) {
        const role = await this.getOneByName(data.name);
        if (role.length) throw new ClientError('Role already exists', 400);
        const [res] = await db._conn.query('UPDATE roles SET ? WHERE id = ?', [data, id]);
        return res.affectedRows;
    }

    async create(data) {
        const role = await this.getOneByName(data.name);
        if (role.length) throw new ClientError('Role already exists', 400);
        const [res] = await db._conn.query('INSERT INTO roles SET ?', [data]);
        return res.insertId;
    }
};

module.exports = RolesService