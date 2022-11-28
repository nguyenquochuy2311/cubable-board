const boardItemFieldRepository = require("../../repositories/boardItemField.repository");

/**
 * @param   _   item id, field id  
 * @return  {}  item field
 */
const getOneByItemIdAndFieldId = async (itemId, fieldId) => {
    const itemField = await boardItemFieldRepository.findByItemAndField(itemId, fieldId);
    return itemField;
}

module.exports = {
    getOneByItemIdAndFieldId
}