const express = require("express");
const router = express.Router();

const fieldController = require("../../../controllers/api/v1/field.controller");

// router.get("/:id", fieldController.getAll);

router.get("/:id", fieldController.getById);

// router.post("/", boardController.create);

// router.put("/:id", boardController.update);

// router.delete("/:id", boardController.destroy);

module.exports = router;