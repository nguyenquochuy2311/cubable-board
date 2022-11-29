const Joi = require("joi");

const fieldForm = Joi.object().keys({
    name: Joi.string().required(),
    fieldTypeId: Joi.number().integer().required(),
    boardId: Joi.number().integer().required()
})

// const keysExculed = ["description"];

async function validationCreateFieldForm(request) {
    const fieldValid = await fieldForm.validateAsync(request);
    return fieldValid;
}

module.exports = validationCreateFieldForm;