const express = require("express");
const router = express.Router();

const isBoardExisted = require("../../../middleware/isBoardExisted");
const boardItemController = require("../../../controllers/api/v1/boardItem.controller");

router.get("/:id", isBoardExisted, boardItemController.getAll);

router.get("/:id/filter", isBoardExisted, boardItemController.getById);

router.post("/:id", isBoardExisted, boardItemController.create);

router.put("/:id/filter", isBoardExisted, boardItemController.update);

router.delete("/:id/filter", isBoardExisted, boardItemController.destroy);

module.exports = router;