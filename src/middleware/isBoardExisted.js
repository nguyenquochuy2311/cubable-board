const createError = require("http-errors");
const Board = require("../models").BoardModel;

const isBoardExisted = async (req, res, next) => {
    const boardId = parseInt(req.params.id);
    
    if(!boardId || !Number.isInteger(boardId)) return next(createError.NotFound());

    const board = await Board.findByPk(boardId);
    if (!board) return next(createError.BadRequest("Board not found"));

    res.board = board.toJSON();
    return next();
}

module.exports = isBoardExisted;