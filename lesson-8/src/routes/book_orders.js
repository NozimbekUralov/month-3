const { Router } = require('express');

/**@param {import("../controllers/book_orders")} bookOrdersController*/
function bookOrdersRouter(bookOrdersController) {
    const router = Router();
    router.post("/", bookOrdersController.CREATE)
    router.get("/all", bookOrdersController.GET_ALL)
    router.get("/:id", bookOrdersController.GET_BY_ID)
    return router
}

module.exports = bookOrdersRouter;