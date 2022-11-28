const { removePropertyObject } = require("../utils/removeFieldObject");

module.exports = class BaseJoiValidation {
    
    constructor(schema) {
        this.schema = schema;
    }

    async validateAsync(data) {
        const dataValid = await this.schema.validateAsync(data);
        return dataValid;
    }
}