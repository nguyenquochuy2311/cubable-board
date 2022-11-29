const Joi = require("joi");

const boardItemForm = Joi.object().keys({
    fieldId: Joi.number().integer().required(),
    value: Joi.string().required()
})

async function validateCreateBoardItemForm(request) {
    return await boardItemForm.validateAsync(request);
}

module.exports = validateCreateBoardItemForm;