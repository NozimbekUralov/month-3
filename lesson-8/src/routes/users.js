const { Router } = require('express');

/**@param {import("../controllers/book_orders")} usersController*/
function usersRouter(usersController) {
    const router = Router();
    router.post("/", usersController.CREATE)
    router.get("/all", usersController.GET_ALL)
    router.route("/:id")
        .delete(usersController.DELETE)
        .get(usersController.GET_BY_ID)
        .put(usersController.UPDATE)
    return router
}

module.exports = usersRouter;