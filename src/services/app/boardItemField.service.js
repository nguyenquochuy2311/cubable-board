const boardItemFieldRepository = require("../../repositories/boardItemField.repository");

/**
 * @param   _   item id, field id  
 * @return  {}  item field
 */
const getOneByItemIdAndFieldId = async (itemId, fieldId) => {
    const itemField = await boardItemFieldRepository.findByItemAndField(itemId, fieldId);
    return itemField;
}

/**
 * @param   _   item id, field id  
 * @return  {}  item field
 */
 const createOrUpdate = async (itemField) => {
    const itemFieldCreatedOrUpdated = await boardItemFieldRepository.createOrUpdateItemField(itemField);
    return itemFieldCreatedOrUpdated;
}

module.exports = {
    createOrUpdate,
    getOneByItemIdAndFieldId
}