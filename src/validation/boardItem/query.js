const Joi = require("joi");

const boardItemQueryString = Joi.object().keys({
    boardItemId: Joi.number().integer().required()
})

async function validateBoardItemQueryString(request) {
    return await boardItemQueryString.validateAsync(request);
}

module.exports = validateBoardItemQueryString;