const createError = require("http-errors");

const Field = require("../../../models").FieldModel;

module.exports = {
    // GET
    getAll: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },

    // GET - /:id
    getById: async (req, res, next) => {
        try {
            const fieldId = req.params.id;
            const field = await Field.findByPk(fieldId);
            if(!field) return next(createError.BadRequest("Field not found"));

            return res.json(field);
        } catch (error) {
            next(error);
        }
    },

    // POST
    create: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },

    // PUT - /:id
    update: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    },

    // DELETE - /:id
    destroy: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}