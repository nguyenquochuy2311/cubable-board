const express = require("express");
const router = express.Router();

const isBoardExisted = require("../../../middlewares/isBoardExisted");
const fieldController = require("../../../controllers/api/v1/field.controller");

router.get("/:id", isBoardExisted, fieldController.getAll);

router.get("/:id/filter", isBoardExisted, fieldController.getById);

router.post("/:id", isBoardExisted, fieldController.create);

router.put("/:id/filter", isBoardExisted, fieldController.update);

router.delete("/:id/filter", isBoardExisted, fieldController.destroy);

module.exports = router;