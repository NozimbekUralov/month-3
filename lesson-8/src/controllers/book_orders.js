const { errorHandler, ClientError, resHandler, ResObj } = require("../utils");

class BookOrdersController {
    /**@type {import("../services/book_orders")} */
    #service;
    /**@type {import("../services/cars")} */
    #carService;
    /**@type {import("../services/users")} */
    #userService;

    constructor(bookOrdersService, carService, userService) {
        this.#service = bookOrdersService;
        this.#carService = carService;
        this.#userService = userService;

        this.CREATE = this.CREATE.bind(this);
        this.GET_ALL = this.GET_ALL.bind(this);
        this.GET_BY_ID = this.GET_BY_ID.bind(this);
    }

    async CREATE(req, res) {
        try {
            const order = req.body;
            const user = await this.#userService.getOneById(order.user);
            if (!user || !user.length) throw new ClientError("User not found", 404);

            const car = await this.#carService.getOneById(order.car);
            if (!car || !car.length) throw new ClientError("Car not found", 404);

            const result = await this.#service.create(order);
            resHandler(new ResObj("created", 201, { order: result }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async GET_ALL(req, res) {
        try {
            const query = req.query;
            const orders = await this.#service.getAll({ page: +query.page || 1, limit: +query.limit || 10 });
            resHandler(new ResObj("ok", 200, { orders }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;
            const order = await this.#service.getOneById(id);
            if (!order.length) throw new ClientError("Order not found", 404);
            resHandler(new ResObj("ok", 200, { order: order[0] }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = BookOrdersController;