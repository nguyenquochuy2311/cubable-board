const Board = require("../../models").BoardModel;
const BoardItem = require("../../models").BoardItemModel;
const Field = require("../../models").FieldModel;
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
    const dataUpdated = await crudService.update(BoardItem, data, { id: id });
    return dataUpdated;
}

/**
 * @param          
 * @return  []  boardItem array 
 */
const getAllByBoardIdIncludeItemFields = async (boardId) => {
    const board = await Board.findByPk(boardId, {
        attributes: ["id", "title"],
        include: [{
            model: BoardItem,
            as: "boardItems",
            attributes: ["id", "name"],
            include: [{
                model: Field,
                as: "boardItemFields",
                attributes: ["id", "name"]
            }]
        }]
    });
    return board;
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
    getAllByBoardIdIncludeItemFields,
    getOneById,
    getOneByIdIncludeItems,
    deleteById,
}

