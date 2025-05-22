const { errorHandler, ClientError, resHandler, ResObj } = require("../utils");

class CarsController {
    /**@type {import("../services/cars")} */
    #carService;
    /**@type {import("../services/brands")} */
    #brandService;

    constructor(carsService, brandService) {
        this.#carService = carsService;
        this.#brandService = brandService;

        this.CREATE = this.CREATE.bind(this);
        this.GET_ALL = this.GET_ALL.bind(this);
        this.DELETE = this.DELETE.bind(this);
        this.UPDATE = this.UPDATE.bind(this);
        this.GET_BY_ID = this.GET_BY_ID.bind(this);
    }
    async CREATE(req, res) {
        try {
            const car = req.body;
            const brand = await this.#brandService.getOneById(car.brand);
            if (!brand) throw new ClientError("Brand not found", 404);
            const result = await this.#carService.create(car)
            resHandler(new ResObj("created", 201, { car: result }), res)
        } catch (err) {
            errorHandler(err, res)
        }
    }
    async GET_ALL(req, res) {
        try {
            const query = req.query;
            const cars = await this.#carService.getAll({ page: +query.page || 1, limit: +query.limit || 10 });
            resHandler(new ResObj("ok", 200, { cars }), res)
        } catch (err) {
            errorHandler(err, res);
        }
    }
    async DELETE(req, res) {
        try {
            const { id } = req.params;
            const result = await this.#carService.delete(id);
            resHandler(new ResObj("deleted", 200, { result: result.affectedRows }), res)
        } catch (err) {
            errorHandler(err, res);
        }
    }
    async UPDATE(req, res) {
        try {
            const { id } = req.params;
            const car = req.body;
            car.updated_at = new Date();
            console.log(car)
            const brand = await this.#carService.update(id, car);
            resHandler(new ResObj("updated", 200, { car: brand }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;
            const car = await this.#carService.getOneById(id);
            console.log(car)
            if (!car.length) throw new ClientError("Car not found", 404);
            resHandler(new ResObj("ok", 200, { car: car[0] }), res)
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = CarsController;