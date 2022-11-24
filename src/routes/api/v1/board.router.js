const express = require("express");
const router = express.Router();

const boardController = require("../../../controllers/api/v1/board.controller");

router.get("/", boardController.getAll);

router.get("/:id", boardController.getById);

router.post("/", boardController.create)

module.exports = router;