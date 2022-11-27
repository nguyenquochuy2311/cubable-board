const BaseRepository = require("./_base.repository");
const Board = require("../models").BoardModel;
const BoardItem = require("../models").BoardItemModel;

class BoardRepository extends BaseRepository {

    constructor() {
        super(Board);
    }

    async findAllBoard() {
        const boardAttr = ["id", "title"];
        const boards = await this.findAll(boardAttr);
        return boards;
    }

    async findByPkBoard(id) {
        const boardAttr = ["id", "title"];
        const board = await this.findByPk(boardAttr, id);
        return board;
    }

    async findByPkBoardIncludeItems(id) {
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
    }

    async destroyByPkBoard(id) {
        const isDeleted = await this.destroy({ id: id });
        return isDeleted;
    }
}

module.exports = new BoardRepository;