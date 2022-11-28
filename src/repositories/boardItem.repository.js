const BaseRepository = require("./_base.repository");
const BoardItem = require("../models").BoardItemModel;
const Field = require("../models").FieldModel;
class BoardItemRepository extends BaseRepository {

    constructor() {
        super(BoardItem);
    }

    async findAllBoardItem() {
        const attributes = ["id", "name", "boardId"];
        const boardItems = await this.findAll(attributes);
        return boardItems;
    }

    async findByPkBoardItem(id) {
        const attributes = ["id", "name", "boardId"];
        const boardItem = await this.findByPk(attributes, id);
        return boardItem;
    }

    async findByBoardIdIncludeFields(boardId) {
        const attributes = ["id", "name", "boardId"];
        const boardItems = await BoardItem.findAll({
            attributes: attributes,
            include: [{
                model: Field,
                as: "boardItemFields",
                attributes: ["id", "name"]
            }],
            where: {
                boardId: boardId
            }
        });
        return boardItems;
    }

    async findByPkIncludeFields(id) {
        const attributes = ["id", "name", "boardId"];
        const boardItem = await BoardItem.findByPk(id, {
            attributes: attributes,
            include: [{
                model: Field,
                as: "boardItemFields",
                attributes: ["id", "name"]
            }]
        });
        return boardItem;
    }

    async destroyByPkBoardItem(id) {
        const isDeleted = await this.destroy({ id: id });
        return isDeleted;
    }
}

module.exports = new BoardItemRepository;