const createError = require("http-errors");

const BoardItem = require("../../../models").BoardItemModel;
const validateCreateBoardItemForm = require("../../../validation/boardItem/create");
const validateBoardItemQueryString = require("../../../validation/boardItem/query");

module.exports = {
    // GET - /:boardId
    getAll: async (req, res, next) => {
        try {
            const board = res.board;

            const boardItems = await BoardItem.findAll({
                attributes: ['id', 'name'],
                where: {
                    boardId: board.id
                }
            });

            return res.json({
                ...board,
                boardItems: boardItems
            });
        } catch (error) {
            next(error);
        }
    },

    // GET - /filter/:boardId?boardItemId=:boardItemId
    getById: async (req, res, next) => {
        try {
            await validateBoardItemQueryString(req.query);

            const { boardItemId } = req.query;
            const boardItem = await BoardItem.findByPk(boardItemId);

            const board = res.board;

            return res.send({
                boardItem,
                board: board
            });
        } catch (error) {
            next(error);
        }
    },

    // POST - /:boardId
    create: async (req, res, next) => {
        try {
            const boardItem = req.body;
            await validateCreateBoardItemForm(boardItem);

            const board = res.board;
            Object.assign(boardItem, { boardId: board.id });
            const boardItemSaved = await BoardItem.create(boardItem);

            return res.json(boardItemSaved);
        } catch (error) {
            next(error);
        }
    },

    // PUT - /filter/:boardId?boardItemId=:boardItemId
    update: async (req, res, next) => {
        try {
            await validateBoardItemQueryString(req.query);

            const { boardItemId } = req.query;
            const boardItem = await BoardItem.findByPk(boardItemId);
            if (!boardItem) return next(createError.BadRequest("Board item not found"));

            const { name } = req.body;
            const board = res.board;

            const boardItemUpdated = await BoardItem.update({
                name: name || boardItem.name,
                boardId: board.id
            }, {
                where: {
                    id: boardItemId
                }
            });

            return boardItemUpdated[0] ? res.json({ message: "Update success" }) : next(createError.BadRequest("Update failed"));
        } catch (error) {
            next(error);
        }
    },

    // DELETE - /filter/:boardId?boardItemId=:boardItemId
    destroy: async (req, res, next) => {
        try {
            await validateBoardItemQueryString(req.query);

            const { boardItemId } = req.query;
            const boardItem = await BoardItem.findByPk(boardItemId);
            if (!boardItem) return next(createError.BadRequest("Board item not found"));

            const boardItemDeleted = await BoardItem.destroy({
                where: {
                    id: boardItemId
                }
            });

            return boardItemDeleted ? res.json({ message: "Delete success" }) : next(createError.BadRequest("Delete failed"));
        } catch (error) {
            next(error);
        }
    }
}