const { errorHandler, resHandler, ResObj, ClientError } = require("../utils")

class RolesController {
    /**@type {import("../services/roles")} */
    #service;

    constructor(service) {
        this.#service = service;
        this.CREATE = this.CREATE.bind(this);
        this.GET_ALL = this.GET_ALL.bind(this);
        this.DELETE = this.DELETE.bind(this);
        this.UPDATE = this.UPDATE.bind(this);
        this.GET_BY_ID = this.GET_BY_ID.bind(this);
    }
    async CREATE(req, res) {
        try {
            const role = req.body;
            const result = await this.#service.create(role);
            resHandler(new ResObj("created", 201, { result }), res)
        } catch (err) {
            errorHandler(err, res);
        }
    }
    async GET_ALL(req, res) {
        try {
            const query = req.query;
            const result = await this.#service.getAll({ page: query.page || 1, limit: query.limit || 10 });
            resHandler(new ResObj("ok", 200, { result }), res)
        } catch (err) {
            console.log(err);
            errorHandler(err, res);
        }
    }
    async DELETE(req, res) {
        try {
            const { id } = req.params;
            const result = await this.#service.delete(id);
            resHandler(new ResObj("deleted", 200, { result }), res)
        } catch (err) {
            errorHandler(err, res);
        }
    }
    async UPDATE(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await this.#service.update(id, data);
            resHandler(new ResObj("updated", 200, { result }), res)
        } catch (err) {
            errorHandler(err, res);
        }
    }
    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;
            const result = await this.#service.getOneById(id);
            if (!result.length) throw new ClientError("not found", 404);
            resHandler(new ResObj("ok", 200, { result }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = RolesController;