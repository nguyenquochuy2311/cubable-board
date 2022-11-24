const express = require("express");
const router = express.Router();
const isBoardExisted = require("../../../middleware/isBoardExisted");
const boardItemController = require("../../../controllers/api/v1/boardItem.controller");

router.get("/:id", isBoardExisted, boardItemController.getByBoardId);

module.exports = router;