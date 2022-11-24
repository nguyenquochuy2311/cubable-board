const createError = require("http-errors");

const Board = require("../../../models").BoardModel;
const BoardItem = require("../../../models").BoardItemModel;
const validateCreateBoardItemForm = require("../../../validation/boardItem/create");

module.exports = {
    // GET param /:id
    getByBoardId: async (req, res, next) => {
        try {
            const board = req.board;

            const boardItems = await BoardItem.findAndCountAll({
                attributes: ['id', 'name'],
                where: {
                    boardId: board.id
                }
            });

            return res.json({ boardItems: boardItems});
        } catch (error) {
            next(error);
        }
    },

    // POST param /:id
    create: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },

    // PUT param /:id
    update: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    },

    // DELETE param /:id
    destroy: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    }
}