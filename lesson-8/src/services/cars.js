const BaseService = require('./index');
const db = require('../lib/db');
const { ClientError } = require('../utils');

module.exports = class CarsService extends BaseService {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.getOneByName = this.getOneByName.bind(this);
    }
    async create(data) {
        const car = await this.getOneByName(data.model);
        if (car.length) throw new ClientError('Car already exists', 400);
        const res = await db._conn.query('INSERT INTO cars SET ?', [data]);
        return {
            id: res[0].insertId,
            ...data
        };
    };
    async update(id, data) {
        const [car] = await this.getOneById(id);
        if (!car.id) throw new ClientError('Car not found', 404);
        if (data.model != car.model) {
            const model = await this.getOneByName(data.model);
            if (model.length) throw new ClientError('Car already exists with this model', 400);
        }
        const res = await db._conn.query('UPDATE cars SET ? WHERE id = ?', [{ ...car, ...data }, id]);
        if (res[0].affectedRows) return { ...car, ...data };
    };
    async delete(id) {
        const car = await this.getOneById(id);
        if (!car) throw new ClientError('Car not found', 404);
        const res = await db._conn.query('DELETE FROM cars WHERE id = ?', [id]);
        return res[0];
    };
    async getAll({ page, limit }) {
        const offset = (page - 1) * limit;
        const res = await db._conn.query('SELECT * FROM cars LIMIT ? OFFSET ?', [limit, offset]);
        return res[0];
    };
    async getOneById(id) {
        const res = await db._conn.query('SELECT * FROM cars WHERE id = ?', [id]);
        return res[0];
    };
    async getOneByName(model) {
        const res = await db._conn.query('SELECT * FROM cars WHERE model = ?', [model]);
        return res[0];
    };
}