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
            const id = req.params.id;
            const board = await Board.findByPk(id ,{
                attributes: ['id', 'title']
            });
            return res.json(board);
        } catch (error) {
            next(error);
        }
    },

    // POST
    create: async(req, res, next) => {
        try {
            const board = req.body;

            await validateCreateBoardForm(board);
            
            const boardSaved = await Board.create(board);

            return res.json(boardSaved);
        } catch (error) {
            next(error);
        }
    }
}