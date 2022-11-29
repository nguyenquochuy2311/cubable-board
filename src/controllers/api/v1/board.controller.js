const createError = require("http-errors");
const boardService = require("../../../services/app/board.service");
const itemService = require("../../../services/app/boardItem.service");
const fieldService = require("../../../services/app/field.service");
const itemFieldService = require("../../../services/app/boardItemField.service");
const validateCreateBoardForm = require("../../../validation/board/create");

module.exports = {
    // GET
    getAll: async (req, res, next) => {
        try {
            const boards = await boardService.getAll();
            return res.json({ boards: boards });
        } catch (error) {
            next(error);
        }
    },

    // GET - /:id
    getById: async (req, res, next) => {
        try {
            const boardId = req.params.id;

            const board = await boardService.getOneByIdIncludeItems(boardId);

            if (!board) return res.json(null);

            let boardItemsRes = [];
            /** Handle response board include items */
            if (board.boardItems) {
                const boardItems = board.boardItems;
                for (const boardItemEle of boardItems) {
                    const boardItemRes = {
                        id: boardItemEle.get("id"),
                        name: boardItemEle.get("name")
                    };
                    boardItemsRes.push(boardItemRes);
                }
            }
            /** End handle response board include items */

            return res.json({
                id: board.get("id"),
                name: board.get("name"),
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
            const boardValid = await validateCreateBoardForm(board);
            
            /** 1. Create board */
            const boardCreated = await boardService.createOne(boardValid);
            if(!boardCreated) return next(createError.BadRequest("Create board failed"));
            
            /** 2. Create field */
            const defaultFieldReq = {
                name: boardValid.nameField,
                boardId: boardCreated.get("id")
            }
            const defaultFieldCreated = await fieldService.createDefaultField(defaultFieldReq);
            if(!defaultFieldCreated) {
                const boardDeleted = await boardService.deleteById(boardCreated.get("id"));
                return next(createError.BadRequest("Create field default failed"));
            }

            return res.json(boardCreated);
        } catch (error) {
            next(error);
        }
    },

    // PUT - /:id
    update: async (req, res, next) => {
        try {
            const boardId = req.params.id;

            const board = await boardService.getOneById(boardId);
            if (!board) return next(createError.BadRequest("Board not found"));

            const { name } = req.body;
            const boardReq = {
                id: boardId,
                name: name || board.get("name")
            };
            const boardUpdated = await boardService.updateById(boardReq);
            if (!boardUpdated) return next(createError.BadRequest("Update failed"));
            
            return res.json(boardUpdated);
        } catch (error) {
            next(error);
        }
    },

    // DELETE - /:id
    destroy: async (req, res, next) => {
        try {
            const boardId = req.params.id;

            const board = await boardService.getOneById(boardId);
            if (!board) return next(createError.BadRequest("Board not found"));

            const isDeleted = await boardService.deleteById(boardId);
            if (isDeleted) return res.json({ message: "Delete success" });

            return next(createError.BadRequest("Delete failed"));
        } catch (error) {
            next(error);
        }
    }
}