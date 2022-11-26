const createError = require("http-errors");

const BoardItemField = require("../../../models").BoardItemFieldModel;

module.exports = {
    // POST - /:boardItemId/:fieldId
    createOrUpdate: async(req, res, next) => {
        try {
            console.log(res.itemField);
            return res.send("here create or update");
        } catch (error) {
            next(error);
        }
    },

    //GET - /:boardItemId/:fieldId
    getByItemAndField: async(req, res, next) => {
        try {
            const itemFieldMiddleware = res.itemField;

            const itemField = await BoardItemField.findOne({
                attributes: ["id", "value"],
                where: {
                    boardItemId: itemFieldMiddleware.boardItem.id,
                    fieldId: itemFieldMiddleware.field.id
                }
            });

            if(!itemField) return res.json(null);

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