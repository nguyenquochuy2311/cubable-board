const createError = require("http-errors");
const boardService = require("../services/app/board.service");
const fieldService = require("../services/app/field.service");

const isValidItemAndField = async (req, res, next) => {
    const { boardItemId, fieldId } = req.params;

    if (!boardItemId ||
        !fieldId ||
        !Number.isInteger(parseInt(boardItemId)) ||
        !Number.isInteger(parseInt(fieldId))) {

        return next(createError.NotFound());
    }

    const boardItem = await boardService.getOneById(boardItemId);
    if (!boardItem) return next(createError.BadRequest("Board not found"));

    const field = await fieldService.getOneById(fieldId);
    if(!field) return next(createError.BadRequest("Field not found"));

    res.itemField = {
        boardItem: boardItem,
        field: field
    }
    return next();
}

module.exports = isValidItemAndField;