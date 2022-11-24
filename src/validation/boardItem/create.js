const Joi = require("joi");

const boardItemForm = Joi.object().keys({
    name: Joi.string().required(),
    boardId: Joi.number().integer().required()
})

async function validationCreateBoardItemForm(request) {
    return await boardItemForm.validateAsync(request);
}

module.exports = validationCreateBoardItemForm;