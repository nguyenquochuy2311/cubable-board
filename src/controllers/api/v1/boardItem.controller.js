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

            const boardItems = await boardItemService.getAllByBoardIdIncludeFields(boardMiddleware.id);
            if (!boardItems) return res.json(null);
            console.log(boardItems);
            let boardItemsRes = [];
            // if (boardItems.boardItemFields) {
            //     for (const boardItem of boardItems.boardItemFields) {
            //         boardItemsRes.push({
            //             id: boardItem.get("id"),
            //             name: boardItem.get("name"),
            //             value: boardItem.BoardItemFieldModel.value
            //         })
            //     }
            // }

            return res.json({
                items: boardItems.boardItemFields
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

            const board = res.board;

            return res.send({
                ...boardItemRes,
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
            const boardItemCreated = await boardItemService.createOne(boardItem);

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
            const board = res.board;

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

// let boardItemsRes = [];
/** Handle response board include items and fields */
// if (board.boardItems) {
//     const boardItems = board.boardItems;
//     for (const boardItemEle of boardItems) {
//         const boardItemRes = {
//             id: boardItemEle.id,
//             name: boardItemEle.name
//         };
//         let boardItemFieldsRes = [];
//         if(boardItemEle.boardItemFields) {
//             const boardItemFields = boardItemEle.boardItemFields;
//             for (const boardItemFieldEle of boardItemFields) {
//                 const boardItemFieldRes = {
//                     id: boardItemFieldEle.id,
//                     name: boardItemFieldEle.name,
//                     value: boardItemFieldEle.BoardItemFieldModel.value
//                 }
//                 boardItemFieldsRes.push(boardItemFieldRes);
//             }
//             boardItemRes.fields = boardItemFieldsRes;
//         }
//         boardItemsRes.push(boardItemRes);
//     }
// }
/** End handle response board include items and fields */