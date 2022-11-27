const boardRepository = require("../../repositories/board.repository");

/**
 * @param   {}  board object       
 * @return  {}  board object 
 */
const createOne = async (data) => {
    const boardCreated = await boardRepository.create(data);
    return boardCreated;
}

/**
 * @param   {}  board object, board id       
 * @return  {}  board object 
 */
const updateById = async (data) => {
    const boardUpdated = await boardRepository.updateByPk(data);
    return boardUpdated;
}

/**
 * @param          
 * @return  []  board array 
 */
const getAll = async () => {
    const boards = await boardRepository.findAllBoard();
    return boards;
};

/**
 * @param   _   board id
 * @return  {}  board object 
 */
const getOneById = async (id) => {
    const board = await boardRepository.findByPkBoard(id);
    return board;
}

/**
 * @param   _   board id
 * @return  {}  board object 
 */
const getOneByIdIncludeItems = async (id) => {
    const board = await boardRepository.findByPkBoardIncludeItems(id);
    return board;
};

/**
 * @param   _       board id
 * @return  0 || 1  boolean
 */
 const deleteById = async (id) => {
    const isDeleted = await boardRepository.destroyByPkBoard(id);
    return isDeleted;
};

module.exports = {
    createOne,
    updateById,
    getAll,
    getOneById,
    getOneByIdIncludeItems,
    deleteById,
}

