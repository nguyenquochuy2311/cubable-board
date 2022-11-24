const createError = require("http-errors");
const Board = require("../models").BoardModel;

const isBoardExisted = async (req, res, next) => {
    const boardId = req.params.id;
    if(!boardId) return next(createError.BadRequest("Board not found"));

    const board = await Board.findByPk(boardId);
    if (!board) return next(createError.BadRequest("Board not found"));

    req.board = board.toJSON();
    return next();
}

module.exports = isBoardExisted;