const boardItemRepository = require("../../repositories/boardItem.repository");

/**
 * @param   {}  board item object       
 * @return  {}  board item object 
 */
const createOne = async (data) => {
    const dataCreated = await boardItemRepository.create(data);
    return dataCreated;
}

/**
 * @param   {}  board item object, board item id       
 * @return  {}  board item object 
 */
const updateById = async (data) => {
    const dataUpdated = await boardItemRepository.updateByPk(data);
    return dataUpdated;
}

/**
 * @param   _   board item id
 * @return  {}  board item object 
 */
const getOneById = async (id) => {
    const boardItem = await boardItemRepository.findByPkBoardItem(id);
    return boardItem;
}

/**
 * @param          
 * @return  []  board item array include field array
 */
const getAllByBoardIdIncludeFields = async (boardId) => {
    const boardItems = await boardItemRepository.findByBoardIdIncludeFields(boardId);
    return boardItems;
};

/**
 * @param          
 * @return  {}  board item object include field array
 */
 const getOneByIdIncludeFields = async (boardItemId) => {
    const boardItem = await boardItemRepository.findByPkIncludeFields(boardItemId);
    return boardItem;
};

/**
 * @param   _       board id
 * @return  0 || 1  boolean
 */
const deleteById = async (id) => {
    const isDeleted = await boardItemRepository.destroyByPkBoardItem(id);
    return isDeleted;
};

module.exports = {
    createOne,
    updateById,
    getOneById,
    getAllByBoardIdIncludeFields,
    getOneByIdIncludeFields,
    deleteById
}

