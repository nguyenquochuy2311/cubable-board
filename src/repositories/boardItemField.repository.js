const BaseRepository = require("./_base.repository");
const BoardItemField = require("../models").BoardItemFieldModel;

class BoardItemFieldRepository extends BaseRepository {

    constructor() {
        super(BoardItemField);
    }

    /**
     * @param  _                item id, field id
     * @return []               board item array
     */
    async findByItemAndField(itemId, fieldId) {
        const attributes = ["id", "value"];
        const where = {
            boardItemId: itemId,
            fieldId: fieldId
        }
        const itemField = await this.findOne(attributes, where);
        return itemField;
    }
}

module.exports = new BoardItemFieldRepository;