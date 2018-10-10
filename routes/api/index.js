const router = require("express").Router();

//consolidating all other routes for one tidy export
const notes = require("./notes");
const headlines = require("./headlines");
const fetch = require("./fetch");
const clear = require("./clear");

router.use("/notes", notes);
router.use("/headlines", headlines);
router.use("/fetch", fetch);
router.use("/clear", clear);

module.exports = router;
