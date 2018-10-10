const router = require("express").Router();
const headlineController = require("../../controllers/headline");

//setting the routes with cb back to controllers
router.get("/", headlineController.findAll);
router.delete("/:id", headlineController.delete);
router.put("/:id", headlineController.update);

module.exports = router;
