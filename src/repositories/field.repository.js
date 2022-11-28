const BaseRepository = require("./_base.repository");
const Field = require("../models").FieldModel;

class FieldRepository extends BaseRepository {

    constructor() {
        super(Field);
    }

    /**
     * @param  _                board id
     * @return {}               board object
     */
    async findByPkField(id) {
        const attributes = ["id", "name"];
        const field = await this.findByPk(attributes, id);
        return field;
    }

    async createDefault() {
        const fieldCreated = await this.create()
    }
}

module.exports = new FieldRepository;