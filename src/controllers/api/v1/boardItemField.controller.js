const createError = require("http-errors");

const BoardItemField = require("../../../models").BoardItemFieldModel;

module.exports = {
    // POST - /:boardItemId/:fieldId
    create: async(req, res, next) => {
        try {
            console.log(res.itemField);
            // todo
            return res.send("here create");
        } catch (error) {
            next(error);
        }
    },

    // PUT - /:boardItemId/:fieldId
    update: async(req, res, next) => {
        try {
            console.log(res.itemField);
            // todo
            return res.send("here update");
        } catch (error) {
            next(error);
        }
    },

    //GET - 
    getByItemAndField: async(req, res, next) => {
        try {
            console.log(res.itemField);
            // todo
            return res.send("here getByItemAndField");
        } catch (error) {
            next(error);
        }
    }
}