const Board = require("../../models").BoardModel;
const BoardItem = require("../../models").BoardItemModel;
const Field = require("../../models").FieldModel;
const crudService = require("./crud.service");
const boardItemService = require("../../repositories/boardItem.repository");
const boardItemRepository = require("../../repositories/boardItem.repository");

/**
 * @param   {}  board item object       
 * @return  {}  board item object 
 */
const createOne = async (data) => {
    const dataCreated = await boardItemService.create(data);
    return dataCreated;
}

/**
 * @param   {}  board item object, board item id       
 * @return  {}  board item object 
 */
const updateById = async (data) => {
    const dataUpdated = await boardItemService.updateByPk(data);
    return dataUpdated;
}

/**
 * @param   _   board item id
 * @return  {}  board item object 
 */
const getOneById = async (id) => {
    const boardItem = await boardItemService.findByPkBoardItem(id);
    return boardItem;
}

/**
 * @param          
 * @return  []  boardItem array include field object
 */
const getAllByBoardIdIncludeFields = async (boardId) => {
    const boardItems = await boardItemRepository.findByBoardIdIncludeItemFields(boardId);
    return boardItems;
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
    deleteById,
}

