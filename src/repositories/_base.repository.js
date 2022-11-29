module.exports = class BaseRepository {
    /**
     * @param  {}               model object
     */
    constructor(Model) {
        this.model = Model;
    }

    /**
     * @param  {} data          object
     * @param  {} where         object || {}
     * @return                  object
     */
    async create(data = {}, where = {}) {
        const dataCreated = await this.model.create(data, {
            where: where
        });
        return dataCreated;
    }

    /**
     * @param  {} data          object include first key as primary key
     * @return                  object
     */
    async updateByPk(data = {}) {
        const [firstKey, firstValue] = Object.entries(data)[0];
        const where = {};  
        where[firstKey] = firstValue;
        const isUpdated = await this.model.update(data, { where: where });
        if (isUpdated[0] === 1) {
            const dataUpdated = await this.model.findOne({ where: where });
            return dataUpdated;
        }
        return {};
    }

    /**
     * @param  {} data          object
     * @param  {} where         object || {}
     * @return                  object
     */
    async update(data = {}, where = {}) {
        const isUpdated = await this.model.update(data, { where: where });
        if (isUpdated[0] === 1) {
            const dataUpdated = await this.model.findOne({ where: where });
            return dataUpdated;
        }
        return {};
    }

    /**
     * @param  {} data          object
     * @param  {} where         object || {}
     * @return                  object
     */
    async createOrUpdate(data = {}, where = {}) {
        const dataExisted = await this.model.findOne({ where: where });
        if (!dataExisted) {
            const dataCreated = await this.model.create(data);
            return dataCreated;
        }
        const isUpdated = await this.model.update(data, { where: where });
        if (isUpdated[0]) {
            const dataUpdated = await this.model.findOne({ where: where });
            return dataUpdated;
        }
        return {};
    }

    /**
     * @param  [] attributes    array include keys by string type || []
     * @param  {} where         object || {}
     * @return []               object array 
     */
    async findAll(attributes = [], where = {}) {
        const data = await this.model.findAll({
            attributes: attributes.length ? attributes : null,
            where: where
        });
        return data;
    }

    /**
     * @param  {} model         object
     * @param  [] attributes    array include keys by string type || []
     * @param  _                primary key value
     * @return {}               object
     */
    async findByPk(attributes = [], id) {
        const data = await this.model.findByPk(id, {
            attributes: attributes.length ? attributes : null
        });
        return data;
    }

    /**
     * @param  [] attributes    array include keys by string type || []
     * @param  {} where         object || {}
     * @return {}               object
     */
    async findOne(attributes = [], where = {}) {
        const data = await this.model.findOne({
            attributes: attributes.length ? attributes : null,
            where: where
        });
        return data;
    }

    /**
     * @param   {} where         object || {}
     * @return  0 || 1           boolean
     */
    async destroy(where = {}) {
        const isDeleted = await this.model.destroy({ where: where });
        return isDeleted;
    }
}