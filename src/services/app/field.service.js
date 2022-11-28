const fieldRepository = require("../../repositories/field.repository");

/**
 * @param   _   field id
 * @return  {}  field object 
 */
const getOneById = async (id) => {
    const field = await fieldRepository.findByPkField(id);
    return field;
}

/**
 * @param   {}  field object       
 * @return  {}  field object 
 */
const createOne = async (data) => {
    const fieldCreated = await fieldRepository.create(data);
    return fieldCreated;
}

/**
 * @param   {}  field object       
 * @return  {}  field object 
 */
 const createDefaultField = async () => {
    const fieldCreated = await fieldRepository.create();
    return fieldCreated;
}

module.exports = {
    getOneById,
    createOne,
    createDefaultField
}