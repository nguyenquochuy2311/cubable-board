const fieldTypeRepository = require("../../repositories/fieldType.repository");

/**
 * @param   _   field type id
 * @return  {}  field type object 
 */
const getOneById = async (id) => {
    const fieldType = await fieldTypeRepository.findByPkFieldType(id);
    return fieldType;
}

/**
 * @param   _   field type object
 * @return  {}  field type object 
 */
const createOne = async (data) => {
    const fieldType = await fieldTypeRepository.create(data);
    return fieldType;
}

module.exports = {
    getOneById,
    createOne,
}