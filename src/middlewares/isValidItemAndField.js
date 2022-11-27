const createError = require("http-errors");

const BoardItem = require("../models").BoardItemModel;
const Field = require("../models").FieldModel;

const isValidItemAndField = async (req, res, next) => {
    const boardItemId = parseInt(req.params.boardItemId);
    const fieldId = parseInt(req.params.fieldId);

    if (!boardItemId ||
        !fieldId ||
        !Number.isInteger(boardItemId) ||
        !Number.isInteger(fieldId)) {

        return next(createError.NotFound());
    }

    const boardItem = await BoardItem.findByPk(boardItemId, {
        attributes: ["id", "name"]
    });
    if (!boardItem) return next(createError.BadRequest("Board not found"));

    const field = await Field.findByPk(fieldId, {
        attributes: ["id", "name"]
    });
    if(!field) return next(createError.BadRequest("Field not found"));

    res.itemField = {
        boardItem: boardItem,
        field: field
    }
    return next();
}

module.exports = isValidItemAndField;