const express = require("express");
const router = express.Router();
const isBoardExisted = require("../../../middleware/isBoardExisted");
const boardItemController = require("../../../controllers/api/v1/boardItem.controller");

router.get("/:id", isBoardExisted, boardItemController.getAll);

router.get("/filter/:id", isBoardExisted, boardItemController.getById);

router.post("/:id", isBoardExisted, boardItemController.create);

router.put("/filter/:id", isBoardExisted, boardItemController.update);

router.delete("/filter/:id", isBoardExisted, boardItemController.destroy);

module.exports = router;