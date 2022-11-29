const createError = require("http-errors");
const fieldService = require("../../../services/app/field.service");
const fieldTypeService = require("../../../services/app/fieldType.service");
const validationCreateFieldForm = require("../../../validation/field/create");
const validationUpdateFieldForm = require("../../../validation/field/update");
const validateBoardFieldQueryString = require("../../../validation/field/query");

module.exports = {
    // GET
    getAll: async (req, res, next) => {
        try {
            const board = req.board;
            const fields = await fieldService.getAllByBoardId(board.id);
            return res.json({ fields: fields });
        } catch (error) {
            next(error);
        }
    },

    // GET - /:id
    getById: async (req, res, next) => {
        try {
            const fieldValid = await validateBoardFieldQueryString(req.query);

            const field = await fieldService.getOneById(fieldValid.fieldId);

            return res.json(field);
        } catch (error) {
            next(error);
        }
    },

    // POST
    create: async (req, res, next) => {
        try {
            const board = req.board;
            req.body.boardId = board.id;
            const fieldValid = await validationCreateFieldForm(req.body);

            const fieldType = await fieldTypeService.getOneById(fieldValid.fieldTypeId);
            if (!fieldType) return next(createError.BadRequest("Field type not found"));

            const fieldTypeCreated = await fieldTypeService.createOne(fieldValid);
            return res.json(fieldTypeCreated);
        } catch (error) {
            next(error);
        }
    },

    // PUT - /:id
    update: async (req, res, next) => {
        try {
            const { fieldId } = req.query;
            const { name } = req.body;
            req.body.id = fieldId;
            const fieldValid = await validationUpdateFieldForm(req.body);

            const field = await fieldService.getOneById(fieldValid.id);
            if (!field) return next(createError.BadRequest("Field not found"));

            const board = req.board;
            if(board.id == field.get("boardId")) {
                const fieldReq = {
                    id: fieldValid.id,
                    name: name || field.get("name")
                };
                const fieldUpdated = await fieldService.updateById(fieldReq);
                if (fieldUpdated) return res.json(fieldUpdated);
            }
            
            return next(createError.BadRequest("Update failed"));
        } catch (error) {
            next(error);
        }
    },

    // DELETE - /:id
    destroy: async (req, res, next) => {
        try {
            const { fieldId } = req.query;
            const field = await fieldService.getOneById(fieldId);
            if (!field) return next(createError.BadRequest("Field not found"));

            const board = req.board;
            if (field.boardId == board.id) {
                const isDeleted = await fieldService.deleteById(fieldId);
                if (isDeleted) return res.json({ message: "Delete success" });
            }

            return next(createError.BadRequest("Delete failed"));
        } catch (error) {
            next(error);
        }
    }
}