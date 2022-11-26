const Board = require("../../models").BoardModel;
const BoardItem = require("../../models").BoardItemModel;
const crudService = require("./crud.service");

/**
 * @param   {}  boardItem object       
 * @return  {}  boardItem object 
 */
const createOne = async (data) => {
    const dataCreated = await crudService.create(BoardItem, data);
    return dataCreated;
}

/**
 * @param   {}  boardItem object, boardItem id       
 * @return  {}  boardItem object 
 */
const updateById = async (data, id) => {
    const dataUpdated = await crudService.update(Board, data, { id: id });
    return dataUpdated;
}

/**
 * @param          
 * @return  []  boardItem array 
 */
const getAll = async () => {
    const boardAttr = ["id", "title"];
    const boards = await crudService.findAll(Board, boardAttr);
    return boards;
};

/**
 * @param   _   board id
 * @return  {}  board object 
 */
const getOneById = async (id) => {
    const boardAttr = ["id", "title"];
    const board = await crudService.findByPk(Board, boardAttr, id);
    return board;
}

/**
 * @param   _   board id
 * @return  {}  board object 
 */
const getOneByIdIncludeItems = async (id) => {
    const boardAttr = ["id", "title"];
    const board = await Board.findByPk(id, {
        attributes: boardAttr,
        include: [{
            attributes: ["id", "name"],
            model: BoardItem,
            as: "boardItems"
        }]
    });
    return board;
};

/**
 * @param   _       board id
 * @return  0 || 1  boolean
 */
 const deleteById = async (id) => {
    const isDeleted = await crudService.destroyByPk(Board, id);
    return isDeleted;
};

module.exports = {
    createOne,
    updateById,
    getAllBoard,
    getOneById,
    getOneByIdIncludeItems,
    deleteById,
}

