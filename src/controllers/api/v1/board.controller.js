const createError = require("http-errors");

const Board = require("../../../models").BoardModel;
const validateCreateBoardForm = require("../../../validation/board/create");

module.exports = {
    // GET
    getAll: async (req, res, next) => {
        try {
            const boards = await Board.findAll({
                attributes: ['id', 'title']
            });
            return res.json({
                boards: boards
            });
        } catch (error) {
            next(error);
        }
    },

    // GET param /:id
    getById: async (req, res, next) => {
        try {
            const boardId = req.params.id;
            const board = await Board.findByPk(boardId, {
                attributes: ['id', 'title']
            });
            return res.json(board);
        } catch (error) {
            next(error);
        }
    },

    // POST
    create: async (req, res, next) => {
        try {
            const board = req.body;

            await validateCreateBoardForm(board);

            const boardSaved = await Board.create(board);

            return res.json(boardSaved);
        } catch (error) {
            next(error);
        }
    },

    // PUT param /:id
    update: async (req, res, next) => {
        try {
            const boardId = req.params.id;

            const board = await Board.findByPk(boardId);
            if (!board) return next(createError.BadRequest("Board not found"));

            const { title } = req.body;

            const boardUpdated = await Board.update({
                title: title || board.title
            }, {
                where: {
                    id: boardId
                }
            });

            return boardUpdated[0] ? res.json({ message: "Update success" }) : next(createError.BadRequest("Update failed"));
        } catch (error) {
            next(error);
        }
    },

    // DELETE param /:id
    destroy: async (req, res, next) => {
        try {
            const boardId = req.params.id;

            const board = await Board.findByPk(boardId);
            if (!board) return next(createError.BadRequest("Board not found"));

            const boardDeleted = await Board.destroy({
                where: {
                    id: boardId
                }
            });
            
            return boardDeleted ? res.json({ message: "Delete success" }) : next(createError.BadRequest("Delete failed"));
        } catch (error) {
            next(error);
        }
    }
}