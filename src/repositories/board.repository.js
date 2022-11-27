const BaseRepository = require("./_base.repository");
const Board = require("../models").BoardModel;
const BoardItem = require("../models").BoardItemModel;

class BoardRepository extends BaseRepository {

    constructor() {
        super(Board);
    }

    async findAllBoard() {
        const attributes = ["id", "title"];
        const boards = await this.findAll(attributes);
        return boards;
    }

    async findByPkBoard(id) {
        const attributes = ["id", "title"];
        const board = await this.findByPk(attributes, id);
        return board;
    }

    async findByPkBoardIncludeItems(id) {
        const attributes = ["id", "title"];
        const board = await Board.findByPk(id, {
            attributes: attributes,
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