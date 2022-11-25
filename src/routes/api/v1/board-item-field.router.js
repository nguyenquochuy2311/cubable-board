const express = require("express");
const router = express.Router();

const isValidItemAndField = require("../../../middleware/isValidItemAndField");
const boardItemFieldController = require("../../../controllers/api/v1/boardItemField.controller");

router.post("/:boardItemId/:fieldId", isValidItemAndField, boardItemFieldController.create);

router.put("/:boardItemId/:fieldId", isValidItemAndField, boardItemFieldController.update);

router.get("/:boardItemId/:fieldId", isValidItemAndField, boardItemFieldController.getByItemAndField);

module.exports = router;