const BaseRepository = require("./_base.repository");
const Board = require("../models").BoardModel;
const BoardItem = require("../models").BoardItemModel;
class BoardRepository extends BaseRepository {

    constructor() {
        super(Board);
    }

    /**
     * @param  _                
     * @return []               board array
     */
    async findAllBoard() {
        const attributes = ["id", "name"];
        const boards = await this.findAll(attributes);
        return boards;
    }

    /**
     * @param  _                board id
     * @return {}               board object
     */
    async findByPkBoard(id) {
        const attributes = ["id", "name"];
        const board = await this.findByPk(attributes, id);
        return board;
    }

    /**
     * @param  _                board id
     * @return {}               board object include items
     */
    async findByPkBoardIncludeItems(id) {
        const attributes = ["id", "name"];
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

    /**
     * @param  _                board id
     * @return 0 || 1           boolean
     */
    async destroyByPkBoard(id) {
        const isDeleted = await this.destroy({ id: id });
        return isDeleted;
    }
}

module.exports = new BoardRepository;