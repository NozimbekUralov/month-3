const { Router } = require('express');

/**@param {import("../controllers/book_orders")} bookOrdersController*/
module.exports = function (bookOrdersController) {
    const router = Router();
    router.post("/", bookOrdersController.CREATE)
    router.get("/all", bookOrdersController.GET_ALL)
    router.route("/:id")
        .delete(bookOrdersController.DELETE)
        .get(bookOrdersController.GET_BY_ID)
        .put(bookOrdersController.UPDATE)
    return router
}