const createError = require("http-errors");
const boardItemService = require("../../../services/app/boardItem.service");
const fieldService = require("../../../services/app/field.service");
const boardItemFieldService = require("../../../services/app/boardItemField.service");
const validateCreateBoardItemForm = require("../../../validation/boardItem/create");
const validateBoardItemQueryString = require("../../../validation/boardItem/query");

module.exports = {
    // GET - /:boardId
    getAll: async (req, res, next) => {
        try {
            const boardMiddleware = req.board;

            const boardItems = await boardItemService.getAllByBoardIdIncludeFields(boardMiddleware.id);
            if (!boardItems) return res.json(null);

            /** Handle response board items include and fields */
            let boardItemsRes = [];
            for (const boardItem of boardItems) {
                let boardItemObj = {
                    id: boardItem.get("id"),
                    name: boardItem.get("name")
                };
                if(boardItem.boardItemFields) {
                    const itemFields = boardItem.boardItemFields;
                    let fields = [];
                    for(const itemField of itemFields) {
                        let field = {
                            id: itemField.get("id"),
                            name: itemField.get("name"),
                            value: itemField.BoardItemFieldModel.get("value")
                        }
                        fields.push(field);
                    }
                    boardItemObj.fields = fields;
                }
                boardItemsRes.push(boardItemObj);
            }
            /** End handle response board items include and fields */

            return res.json({
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
            const boardItem = await boardItemService.getOneByIdIncludeFields(boardItemId);
            if (!boardItem) return res.json(null);

            const boardItemRes = {
                id: boardItem.get("id"),
                name: boardItem.get("name"),
                fields: boardItem.boardItemFields || []
            };

            // const board = res.board;
            return res.json(boardItemRes);
        } catch (error) {
            next(error);
        }
    },

    // POST - /:boardId
    create: async (req, res, next) => {
        try {
            const board = req.board;
            const boardItemValid = await validateCreateBoardItemForm(req.body);

            const field = await fieldService.getOneById(boardItemValid.fieldId);
            if(!field || board.id != field.boardId) return next(createError.BadRequest("Field not found"));

            const itemCreated = await boardItemService.createOne({ boardId: board.id });
            if(!itemCreated) return next(createError.BadRequest("Create failed"));

            const itemFieldCreated = await boardItemFieldService.createOrUpdate({
                value: boardItemValid.value,
                boardItemId: itemCreated.get("id"),
                fieldId: field.get("id")
            })
            if(!itemFieldCreated) {
                const itemDeleted = await boardItemService.deleteById(itemCreated.get("id"));
                return next(createError.BadRequest("Create failed"));
            }

            return res.json(itemCreated);
        } catch (error) {
            next(error);
        }
    },

    // PUT - /:boardId/filter?boardItemId=:boardItemId
    update: async (req, res, next) => {
        try {
            const board = req.board;
            const { boardItemId } = req.query;
            
            const boardItem = await boardItemService.getOneById(boardItemId);
            if(!boardItem) return next(createError.BadRequest("Board item not found"));

            const boardValid = await validateCreateBoardItemForm(req.body);

            const field = await fieldService.getOneById(boardValid.fieldId);
            if(!field || field.get("boardId") != board.id) return next(createError.BadRequest("Field not found"));

            const itemField = await boardItemFieldService.createOrUpdate({
                value: boardValid.value,
                boardItemId: boardItem.get("id"),
                fieldId: field.get("id")
            });
            if(!itemField) return next(createError.BadRequest("Update failed"));

            return res.json({
                id: itemField.get("id"),
                value: itemField.get("value")
            });
        } catch (error) {
            next(error);
        }
    },

    // DELETE - /:boardId/filter?boardItemId=:boardItemId
    destroy: async (req, res, next) => {
        try {
            await validateBoardItemQueryString(req.query);

            const { boardItemId } = req.query;
            const boardItem = await boardItemService.getOneById(boardItemId);
            if (!boardItem) return next(createError.BadRequest("Board item not found"));

            const boardItemDeleted = await boardItemService.deleteById(boardItemId);
            if (boardItemDeleted) return res.json({ message: "Delete success" });

            return next(createError.BadRequest("Delete failed"));
        } catch (error) {
            next(error);
        }
    }
}
