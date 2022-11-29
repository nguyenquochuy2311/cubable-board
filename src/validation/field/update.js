const Joi = require("joi");

const removePropertyObject = require("../../utils/removeFieldObject");

const fieldForm = Joi.object().keys({
    id: Joi.number().integer().required(),
    name: Joi.string()
})

const keysExculed = ["fieldTypeId", "boardId"];

async function validationUpdateFieldForm(request) {
    const fieldValid = await fieldForm.validateAsync(request);
    const fieldAccess = removePropertyObject(fieldValid, keysExculed);
    return fieldAccess;
}

module.exports = validationUpdateFieldForm;