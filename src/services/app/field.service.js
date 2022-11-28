const fieldRepository = require("../../repositories/field.repository");

/**
 * @param   _   field id
 * @return  {}  field object 
 */
const getOneById = async (id) => {
    const field = await fieldRepository.findByPkField(id);
    return field;
}

module.exports = {
    getOneById
}