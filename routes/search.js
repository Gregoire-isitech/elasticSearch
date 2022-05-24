const searchController = require("../controllers/search")
let router = require("express").Router()

router.get("/hello", searchController.hello)
router.get("/:query", searchController.search)

module.exports = router