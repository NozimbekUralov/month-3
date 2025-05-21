const { Router } = require('express');

/**@param {import("../controllers/roles")} rolesController*/
function rolesRouter(rolesController) {
    const router = Router();
    router.post("/", rolesController.CREATE)
    router.get("/all", rolesController.GET_ALL)
    router.route("/:id")
        .delete(rolesController.DELETE)
        .get(rolesController.GET_BY_ID)
        .put(rolesController.UPDATE)
    return router
}
module.exports = rolesRouter;