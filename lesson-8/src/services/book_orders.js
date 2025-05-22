const BaseService = require('./index');
const db = require('../lib/db');
const { ClientError } = require('../utils');

module.exports = class BookOrdersService extends BaseService {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.getOneByUser = this.getOneByUser.bind(this);
    }

    async create(data) {
        const res = await db._conn.query('INSERT INTO book_orders SET ?', [data]);
        return {
            id: res[0].insertId,
            ...data
        };
    }

    async getAll({ page, limit }) {
        const offset = (page - 1) * limit;
        const res = await db._conn.query('SELECT * FROM book_orders LIMIT ? OFFSET ?', [limit, offset]);
        return res[0];
    }

    async getOneById(id) {
        const res = await db._conn.query('SELECT * FROM book_orders WHERE id = ?', [id]);
        return res[0];
    }

    async getOneByUser(user) {
        const res = await db._conn.query('SELECT * FROM book_orders WHERE user = ?', [user]);
        return res[0];
    }
}