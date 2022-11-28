const createError = require("http-errors");
const boardService = require("../services/app/board.service");

const isBoardExisted = async (req, res, next) => {
    const boardId = parseInt(req.params.id);
    
    if(!boardId || !Number.isInteger(boardId)) return next(createError.NotFound());

    const board = await boardService.getOneById(boardId);
    if (!board) return next(createError.BadRequest("Board not found"));

    req.board = board.toJSON();
    return next();
}

module.exports = isBoardExisted;