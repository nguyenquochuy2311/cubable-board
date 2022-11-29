const Joi = require("joi");

const removePropertyObject = require("../../utils/removeFieldObject");

const boardForm = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    value: Joi.string().required()
})

const keysExculed = ["description"];

async function validationCreateBoardForm(request) {
    const boardValid = await boardForm.validateAsync(request);
    const boardAccess = removePropertyObject(boardValid, keysExculed);
    return boardAccess;
}

module.exports = validationCreateBoardForm;