const { Router } = require('express');

/**@param {import("../controllers/brands")} brandsController*/
function brandsRouter(brandsController) {
    const router = Router();
    router.post("/", brandsController.CREATE)
    router.get("/all", brandsController.GET_ALL)
    router.route("/:id")
        .delete(brandsController.DELETE)
        .get(brandsController.GET_BY_ID)
        .put(brandsController.UPDATE)
    return router
}

module.exports = brandsRouter;