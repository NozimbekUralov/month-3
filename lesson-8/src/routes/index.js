const { Router } = require('express');
const carsRouter = require('./cars');
const brandsRouter = require('./brands');
const ordersRouter = require('./book_orders');
const rolesRouter = require('./roles');
const usersRouter = require('./users');

const CarsService = require('../services/cars');
const BrandsService = require('../services/brands');
const OrdersService = require('../services/book_orders');
const RolesService = require('../services/roles');
const UsersService = require('../services/users');

const CarsController = require('../controllers/cars');
const BrandsController = require('../controllers/brands');
const OrdersController = require('../controllers/book_orders');
const RolesController = require('../controllers/roles');
const UsersController = require('../controllers/users');



const services = () => {
    const carsService = new CarsService();
    const brandsService = new BrandsService();
    const ordersService = new OrdersService();
    const rolesService = new RolesService();
    const usersService = new UsersService();
    return {
        carsService,
        brandsService,
        ordersService,
        rolesService,
        usersService
    }
}

const controllers = () => {
    const {
        carsService,
        brandsService,
        ordersService,
        rolesService,
        usersService,
    } = services();
    const carsController = new CarsController(carsService, brandsService);
    const brandsController = new BrandsController(brandsService);
    const ordersController = new OrdersController(ordersService);
    const rolesController = new RolesController(rolesService);
    const usersController = new UsersController(usersService, rolesService);
    return {
        carsController,
        brandsController,
        ordersController,
        rolesController,
        usersController
    };
}

module.exports = function () {
    const {
        rolesController,
        usersController,
        carsController,
        ordersController,
        brandsController
    } = controllers();
    const router = Router();
    router.use("/role", rolesRouter(rolesController));
    router.use("/user", usersRouter(usersController));
    router.use("/car", carsRouter(carsController));
    router.use("/order", ordersRouter(ordersController));
    router.use("/brand", brandsRouter(brandsController));
    return router;
}
