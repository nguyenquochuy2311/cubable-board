module.exports = {
    /**
     * @param  {} model object
     * @param  {} data  object
     * @param  {} where object || {}
     * @return          object
     */
    create: async (model, data, where = {}) => {
        const dataCreated = await model.create(data, {
            where: where
        });
        return dataCreated;
    },

    /**
     * @param  {} model object
     * @param  {} data  object
     * @param  {} where object || {}
     * @return {}       object
     */
    update: async (model, data, where = {}) => {
        const isUpdated = await model.update(data, { where: where });
        if (isUpdated[0] === 1) {
            const dataUpdated = await model.findOne({ where: where });
            return dataUpdated;
        }
        return {};
    },

    /**
     * @param  {} model object
     * @param  {} data  object
     * @param  {} where object || {}
     * @return {}       object
     */
    createOrUpdate: async (model, data, where = {}) => {
        const dataExisted = await model.findOne({ where: where });
        if (!dataExisted) {
            const dataCreated = await model.create(data);
            return dataCreated;
        }
        const isUpdated = await model.update(data, { where: where });
        if (isUpdated[0]) {
            const dataUpdated = await model.findOne({ where: where });
            return dataUpdated;
        }
        return {};
    },

    /**
     * @param  {} model         object
     * @param  [] attributes    array include keys by string type || []
     * @param  {} where         object || {}
     * @return []               object array 
     */
    findAll: async (model, attributes = [], where = {}) => {
        const data = await model.findAll({
            attributes: attributes.length ? attributes : null
        }, { where: where });
        return data;
    },

    /**
     * @param  {} model         object
     * @param  [] attributes    array include keys by string type || []
     * @param  _                primary key value
     * @return {}               object
     */
    findByPk: async (model, attributes = [], id) => {
        const data = await model.findByPk(id.toString(), {
            attributes: attributes.length ? attributes : null
        });
        return data;
    },

    /**
     * @param  {} model         object
     * @param  [] attributes    array include keys by string type || []
     * @param  {} where         object || {}
     * @return {}               object
     */
    findOne: async (model, attributes = [], where = {}) => {
        const data = await model.findOne({
            attributes: attributes.length ? attributes : null
        }, { where: where });
        return data;
    },

    /**
     * @param   {} model         object
     * @param   _                primary key value
     * @return  0 || 1           boolean
     */
    destroyByPk: async (model, id) => {
        const isDeleted = await model.destroy({ where: { id: id.toString()}});
        return isDeleted;
    },
    
    /**
     * @param   {} model         object
     * @param   {} where         object || {}
     * @return  0 || 1           boolean
     */
    destroy: async (model, where = {}) => {
        const isDeleted = await model.destroy({ where: where});
        return isDeleted;
    }
}