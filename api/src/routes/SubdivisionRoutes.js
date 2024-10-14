const router = require("express").Router();

const SubdivisionController = require("../controllers/SubdivisionController");

router.get("/", SubdivisionController.getSubDivisions);

module.exports = router;
