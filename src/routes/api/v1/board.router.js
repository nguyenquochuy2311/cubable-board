const express = require("express");
const router = express.Router();

const boardController = require("../../../controllers/v1/board.controller");

router.get("/", boardController.getAll);

module.exports = router;