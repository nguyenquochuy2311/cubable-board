const Joi = require("joi");

const removePropertyObject = require("../../utils/removePropertyObject");

const boardForm = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string()
})

const keysExculed = ["description"];

async function validationCreateBoardForm(request) {
    const boardValid = await boardForm.validateAsync(request);
    const boardRequired = removePropertyObject(boardValid, keysExculed);
    console.log(boardRequired);
    return boardValid;
}

module.exports = validationCreateBoardForm;