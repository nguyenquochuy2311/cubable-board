const createError = require("http-errors");

const Board = require("../../../models").BoardModel;
const BoardItem = require("../../../models").BoardItemModel;
const Field = require("../../../models").FieldModel;
const boardItemService = require("../../../services/app/boardItem.service");
const validateCreateBoardItemForm = require("../../../validation/boardItem/create");
const validateBoardItemQueryString = require("../../../validation/boardItem/query");

module.exports = {
    // GET - /:boardId
    getAll: async (req, res, next) => {
        try {
            const boardMiddleware = res.board;

            const board = await boardItemService.getAllByBoardIdIncludeItemFields(boardMiddleware.id);

            if(!board) return res.json(null);

            let boardItemsRes = [];
            /** Handle response board include items and fields */
            if (board.boardItems) {
                const boardItems = board.boardItems;
                for (const boardItemEle of boardItems) {
                    const boardItemRes = {
                        id: boardItemEle.id,
                        name: boardItemEle.name
                    };
                    let boardItemFieldsRes = [];
                    if(boardItemEle.boardItemFields) {
                        const boardItemFields = boardItemEle.boardItemFields;
                        for (const boardItemFieldEle of boardItemFields) {
                            const boardItemFieldRes = {
                                id: boardItemFieldEle.id,
                                name: boardItemFieldEle.name,
                                value: boardItemFieldEle.BoardItemFieldModel.value
                            }
                            boardItemFieldsRes.push(boardItemFieldRes);
                        }
                        boardItemRes.fields = boardItemFieldsRes;
                    }
                    boardItemsRes.push(boardItemRes);
                }
            }
            /** End handle response board include items and fields */

            return res.json({
                id: board.id,
                title: board.title,
                items: boardItemsRes
            });
        } catch (error) {
            next(error);
        }
    },

    // GET - /:boardId/filter?boardItemId=:boardItemId
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

    // PUT - /:boardId/filter?boardItemId=:boardItemId
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

    // DELETE - /:boardId/filter?boardItemId=:boardItemId
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