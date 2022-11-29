const Joi = require("joi");

const boardFieldQueryString = Joi.object().keys({
    fieldId: Joi.number().integer().required()
})

async function validateBoardFieldQueryString(request) {
    return await boardFieldQueryString.validateAsync(request);
}

module.exports = validateBoardFieldQueryString;