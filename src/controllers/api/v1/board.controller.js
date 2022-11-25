const createError = require("http-errors");

const Board = require("../../../models").BoardModel;
const BoardItem = require("../../../models").BoardItemModel;
const Field = require("../../../models").FieldModel;
const validateCreateBoardForm = require("../../../validation/board/create");

module.exports = {
    // GET
    getAll: async (req, res, next) => {
        try {
            const boards = await Board.findAll({
                attributes: ["id", "title"]
            });

            return res.json({ boards: boards });
        } catch (error) {
            next(error);
        }
    },

    // GET - /:id
    getById: async (req, res, next) => {
        try {
            const boardId = req.params.id;

            const board = await Board.findByPk(boardId, {
                attributes: ["id", "title"],
                include: [{
                    model: BoardItem,
                    as: "boardItems",
                    attributes: ["id", "name"],
                    include: [{
                        model: Field,
                        as: "boardItemFields"
                    }]
                }]
            });

            if(!board) return res.json(null);

            let boardItemsRes = [];
            /** Handle response board include items and fields */
            if (board.boardItems) {
                const boardItems = board.boardItems;
                boardItems.forEach((boardItemEle) => {
                    const boardItemRes = {
                        id: boardItemEle.id,
                        name: boardItemEle.name
                    };

                    let boardItemFieldsRes = [];
                    const boardItemFields = boardItemEle.boardItemFields;
                    boardItemFields.forEach((boardItemFieldEle) => {
                        const boardItemFieldRes = {
                            id: boardItemFieldEle.id,
                            name: boardItemFieldEle.name,
                            value: boardItemFieldEle.BoardItemFieldModel.value
                        }
                        boardItemFieldsRes.push(boardItemFieldRes);
                    });
                    boardItemRes.fields = boardItemFieldsRes;
                    boardItemsRes.push(boardItemRes);
                });
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

    // PUT - /:id
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

    // DELETE - /:id
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