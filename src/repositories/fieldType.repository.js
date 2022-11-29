const BaseRepository = require("./_base.repository");
const FieldType = require("../models").FieldTypeModel;

class FieldTypeRepository extends BaseRepository {
    constructor() {
        super(FieldType);
    }

    /**
     * @param  _                field type id
     * @return {}               field type object
     */
     async findByPkFieldType(id) {
        const attributes = ["id", "name"];
        const fieldType = await this.findByPk(attributes, id);
        return fieldType;
    }
}

module.exports = new FieldTypeRepository;