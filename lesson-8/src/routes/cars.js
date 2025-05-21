const { Router } = require('express');

/**@param {import("../controllers/cars")} carsController*/
module.exports = function (carsController) {
    const router = Router();
    router.post("/", carsController.CREATE)
    router.get("/all", carsController.GET_ALL)
    router.route("/:id")
        .delete(carsController.DELETE)
        .get(carsController.GET_BY_ID)
        .put(carsController.UPDATE)
    return router
}