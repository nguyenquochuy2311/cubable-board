const Joi = require("joi");

const boardForm = Joi.object().keys({
    name: Joi.string().required()
})

async function validationCreateBoardForm(request) {
    return await boardForm.validateAsync(request);
}

module.exports = validationCreateBoardForm;