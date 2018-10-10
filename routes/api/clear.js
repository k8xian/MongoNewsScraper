const router = require("express").Router();
const clearController = require("../../controllers/clear");


router.get("/", clearController.dbClear);
module.exports = router;
