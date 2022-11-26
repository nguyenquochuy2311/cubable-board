const Joi = require("joi");

const boardItemFieldForm = Joi.object().keys({
    value: Joi.string().optional().allow(null, "").required()
})

async function validateCreateOrUpdateBoardItemFieldForm(request) {
    return await boardItemFieldForm.validateAsync(request);
}

module.exports = validateCreateOrUpdateBoardItemFieldForm;