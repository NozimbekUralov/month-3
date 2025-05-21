const { Router } = require('express');

/**@param {import("../controllers/book_orders")} usersController*/
module.exports = function (usersController) {
    const router = Router();
    router.post("/", usersController.CREATE)
    router.get("/all", usersController.GET_ALL)
    router.route("/:id")
        .delete(usersController.DELETE)
        .get(usersController.GET_BY_ID)
        .put(usersController.UPDATE)
    return router
}