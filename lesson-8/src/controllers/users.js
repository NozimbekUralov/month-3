const { errorHandler, ClientError, resHandler, ResObj } = require("../utils");

class UsersController {
    /**@type {import("../services/users")} */
    #service;
    /**@type {import("../services/roles")?} */
    #roleService;

    constructor(usersService, roleService) {
        this.#service = usersService;
        this.#roleService = roleService;

        this.CREATE = this.CREATE.bind(this);
        this.GET_ALL = this.GET_ALL.bind(this);
        this.DELETE = this.DELETE.bind(this);
        this.UPDATE = this.UPDATE.bind(this);
        this.GET_BY_ID = this.GET_BY_ID.bind(this);
    }

    async CREATE(req, res) {
        try {
            const user = req.body;
            // Optionally check if role exists
            if (this.#roleService && user.role) {
                const role = await this.#roleService.getOneById(user.role);
                if (!role || !role.length) throw new ClientError("Role not found", 404);
            }
            const result = await this.#service.create(user);
            resHandler(new ResObj("created", 201, { user: result }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async GET_ALL(req, res) {
        try {
            const query = req.query;
            const users = await this.#service.getAll({ page: +query.page || 1, limit: +query.limit || 10 });
            resHandler(new ResObj("ok", 200, { users }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async DELETE(req, res) {
        try {
            const { id } = req.params;
            const result = await this.#service.delete(id);
            resHandler(new ResObj("deleted", 200, { result: result.affectedRows || result }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async UPDATE(req, res) {
        try {
            const { id } = req.params;
            const user = req.body;
            user.updated_at = new Date();
            // Optionally check if role exists
            if (this.#roleService && user.role) {
                const role = await this.#roleService.getOneById(user.role);
                if (!role || !role.length) throw new ClientError("Role not found", 404);
            }
            const updated = await this.#service.update(id, user);
            resHandler(new ResObj("updated", 200, { user: updated }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;
            const user = await this.#service.getOneById(id);
            if (!user.length) throw new ClientError("User not found", 404);
            resHandler(new ResObj("ok", 200, { user: user[0] }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = UsersController;