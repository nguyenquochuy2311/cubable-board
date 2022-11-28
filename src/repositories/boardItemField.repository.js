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

    /**
     * @param  {}               board item field
     * @return {}               board item field created or updated
     */
    async createOrUpdateItemField(itemField) {
        const where = {
            boardItemId: itemField.boardItemId,
            fieldId: itemField.fieldId
        }
        const itemFieldCreatedOrUpdated = this.createOrUpdate(itemField, where);
        return itemFieldCreatedOrUpdated;    
    }
}

module.exports = new BoardItemFieldRepository;