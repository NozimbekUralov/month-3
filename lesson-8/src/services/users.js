const BaseService = require('./index');
const db = require('../lib/db');
const { ClientError } = require('../utils');

module.exports = class UsersService extends BaseService {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.getOneByEmail = this.getOneByEmail.bind(this);
        this.getOneByName = this.getOneByName.bind(this);
    }

    async create(data) {
        const user = await this.getOneByEmail(data.email);
        if (user.length) throw new ClientError('User already exists', 400);
        const res = await db._conn.query('INSERT INTO users SET ?', [data]);
        return {
            id: res[0].insertId,
            ...data
        };
    }

    async update(id, data) {
        const [user] = await this.getOneById(id);
        if (!user.id) throw new ClientError('User not found', 404);
        if (data.email && data.email !== user.email) {
            const emailUser = await this.getOneByEmail(data.email);
            if (emailUser.length) throw new ClientError('User already exists with this email', 400);
        }
        const res = await db._conn.query('UPDATE users SET ? WHERE id = ?', [{ ...user, ...data }, id]);
        if (res[0].affectedRows) return { ...user, ...data };
    }

    async delete(id) {
        const user = await this.getOneById(id);
        if (!user) throw new ClientError('User not found', 404);
        const res = await db._conn.query('DELETE FROM users WHERE id = ?', [id]);
        return res[0];
    }

    async getAll({ page, limit }) {
        const offset = (page - 1) * limit;
        const res = await db._conn.query('SELECT * FROM users LIMIT ? OFFSET ?', [limit, offset]);
        return res[0];
    }

    async getOneById(id) {
        const res = await db._conn.query('SELECT * FROM users WHERE id = ?', [id]);
        return res[0];
    }

    async getOneByEmail(email) {
        const res = await db._conn.query('SELECT * FROM users WHERE email = ?', [email]);
        return res[0];
    }

    async getOneByName(name) {
        const res = await db._conn.query('SELECT * FROM users WHERE name = ?', [name]);
        return res[0];
    }
}