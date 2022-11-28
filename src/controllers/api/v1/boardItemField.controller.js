const createError = require("http-errors");
const validateCreateOrUpdateBoardItemFieldForm = require("../../../validation/boardItemField/createOrUpdate");
const boardItemFieldService = require("../../../services/app/boardItemField.service");

module.exports = {
    // POST - /:boardItemId/:fieldId
    createOrUpdate: async (req, res, next) => {
        try {
            await validateCreateOrUpdateBoardItemFieldForm(req.body);
            const { value } = req.body;

            const itemFieldMiddleware = req.itemField;

            const itemField = {
                value: value,
                boardItemId: itemFieldMiddleware.boardItem.id,
                fieldId: itemFieldMiddleware.field.id
            };
            const itemFieldCreatedOrUpdated = await boardItemFieldService.createOrUpdate(itemField);
            if(!itemFieldCreatedOrUpdated) next(createError.BadRequest("Create or update failed"));

            return res.json(itemFieldCreatedOrUpdated);
        } catch (error) {
            next(error);
        }
    },

    //GET - /:boardItemId/:fieldId
    getByItemAndField: async (req, res, next) => {
        try {
            const itemFieldMiddleware = req.itemField;

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