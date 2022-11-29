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
            const boardItem = req.body;
            await validateCreateBoardItemForm(boardItem);

            const board = req.board;
            Object.assign(boardItem, { boardId: board.id });

            const fieldCreated = await fieldService.createDefaultField();
            if(!fieldCreated) next(createError.BadRequest("Field need create first")); 

            const boardItemCreated = await boardItemService.createOne(boardItem);
            if(!boardItemCreated) next(createError.BadRequest("Create item failed"));
                        
            const itemFieldCreated = await boardItemFieldService.createOrUpdate({
                boardItemId: boardItemCreated.get("id"),
                fieldId: fieldCreated.get("id")
            })
            if(!itemFieldCreated) next(createError.BadRequest("Create item field failed"));

            return res.json(boardItemCreated);
        } catch (error) {
            next(error);
        }
    },

    // PUT - /:boardId/filter?boardItemId=:boardItemId
    update: async (req, res, next) => {
        try {
            await validateBoardItemQueryString(req.query);

            const { boardItemId } = req.query;
            const boardItem = await boardItemService.getOneById(boardItemId);
            if (!boardItem) return next(createError.BadRequest("Board item not found"));

            const { name } = req.body;
            const board = req.board;

            const boardItemReq = {
                id: boardItemId,
                name: name || boardItem.get("name"),
                boardId: board.id
            };
            const boardItemUpdated = await boardItemService.updateById(boardItemReq);
            if (!boardItemUpdated) return next(createError.BadRequest("Updated failed"));

            return res.json(boardItemUpdated);
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