const createError = require("http-errors");

const BoardItemField = require("../../../models").BoardItemFieldModel;
const validateCreateOrUpdateBoardItemFieldForm = require("../../../validation/boardItemField/createOrUpdate");

const crudService = require("../../../services/app/crud.service");
const boardItemFieldService = require("../../../services/app/boardItemField.service");

module.exports = {
    // POST - /:boardItemId/:fieldId
    createOrUpdate: async (req, res, next) => {
        try {
            await validateCreateOrUpdateBoardItemFieldForm(req.body);
            const { value } = req.body;

            const itemFieldMiddleware = res.itemField;

            const itemFieldWhere = {
                boardItemId: itemFieldMiddleware.boardItem.id,
                fieldId: itemFieldMiddleware.field.id
            }
            const itemFieldReq = Object.assign({
                value: value
            }, itemFieldWhere);

            const itemFieldCreatedOrUpdated = await crudService.createOrUpdate(next, BoardItemField, itemFieldReq, itemFieldWhere);
            return res.json(itemFieldCreatedOrUpdated);
        } catch (error) {
            next(error);
        }
    },

    //GET - /:boardItemId/:fieldId
    getByItemAndField: async (req, res, next) => {
        try {
            const itemFieldMiddleware = res.itemField;

            const itemId = itemFieldMiddleware.boardItem.id;
            const fieldId = itemFieldMiddleware.field.id;
            const itemField = await boardItemFieldService.getOneByItemIdAndFieldId(itemId, fieldId);

            if (!itemField) return res.json(null);

            return res.json({
                id: itemField.id,
                value: itemField.value,
                boardItem: itemFieldMiddleware.boardItem,
                field: itemFieldMiddleware.field
            });
        } catch (error) {
            next(error);
        }
    }
}