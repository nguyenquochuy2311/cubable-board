const BaseRepository = require("./_base.repository");
const Field = require("../models").FieldModel;
const FieldType = require("../models").FieldTypeModel;
const Board = require("../models").BoardModel;
class FieldRepository extends BaseRepository {

    constructor() {
        super(Field);
    }

    /**
     * @param  _                board id
     * @return {}               board object
     */
    async findByPkField(id) {
        const attributes = ["id", "name", "boardId"];
        const field = await this.findByPk(attributes, id);
        return field;
    }

    /**
     * @param  _                board id
     * @return {}               field object
     */
    async createDefault(boardId) {
        const fieldTypeFirst = await FieldType.findOne();
        const fieldDefault = {
            fieldTypeId: fieldTypeFirst.get("id"),
            boardId: boardId
        }
        const fieldCreated = await this.create(fieldDefault);
        return fieldCreated;
    }

    /**
     * @param  _                field id
     * @return []               fields array
     */
    async findAllByBoardId(boardId) {
        const attributes = ["id", "name", "fieldTypeId", "boardId"];
        const fields = await this.findAll(attributes, { boardId: boardId });
        return fields;
    }

    /**
     * @param  _                field id
     * @return 0 || 1           boolean
     */
    async destroyById(fieldId) {
        const isDeleted = await this.destroy({ id: fieldId });
        return isDeleted;
    }
}

module.exports = new FieldRepository;