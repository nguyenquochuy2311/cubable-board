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

/**
 * @param   _   board id      
 * @return  []  field array 
 */
const getAllByBoardId = async (boardId) => {
    const fields = await fieldRepository.findAllByBoardId(boardId);
    return fields;
}

/**
 * @param   _   field object
 * @return  {}  field object 
 */
const updateById = async (data) => {
    const fieldType = await fieldRepository.updateByPk(data);
    return fieldType;
}

/**
 * @param   _       field id
 * @return  0 || 1  boolean
 */
const deleteById = async (id) => {
    const isDeleted = await fieldRepository.destroyById(id);
    return isDeleted;
}

module.exports = {
    getOneById,
    createOne,
    createDefaultField,
    getAllByBoardId,
    updateById,
    deleteById
}