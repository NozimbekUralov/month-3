const { Router } = require('express');

/**@param {import("../controllers/brands")} brandsController*/
module.exports = function (brandsController) {
    const router = Router();
    router.post("/", brandsController.CREATE)
    router.get("/all", brandsController.GET_ALL)
    router.route("/:id")
        .delete(brandsController.DELETE)
        .get(brandsController.GET_BY_ID)
        .put(brandsController.UPDATE)
    return router
}