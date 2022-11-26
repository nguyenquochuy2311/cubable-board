module.exports = {
    /**
     * @param  {} next  next
     * @param  {} model object
     * @param  {} data  object
     * @param  {} where object || {}
     * @return          object
     */
    create: async (next, model, data, where = {}) => {
        try {
            const dataCreated = await model.create(data, {
                where: where
            });
            return dataCreated;
        } catch (error) {
            next(error);
        }
    },

    /**
     * @param  {} next  next
     * @param  {} model object
     * @param  {} data  object
     * @param  {} where object || {}
     * @return {}       object
     */
    update: async (next, model, data, where = {}) => {
        try {
            const isUpdated = await model.update(data, { where: where });
            if (isUpdated[0]) {
                const dataUpdated = await model.fineOne({ where: where });
                return dataUpdated;
            }
            return {};
        } catch (error) {
            next(error);
        }
    },

    /**
     * @param  {} next  next
     * @param  {} model object
     * @param  {} data  object
     * @param  {} where object || {}
     * @return {}       object
     */
    createOrUpdate: async (next, model, data, where = {}) => {
        try {
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
        } catch (error) {
            next(error);
        }
    },

    /**
     * @param  {} next          next
     * @param  {} model         object
     * @param  [] attributes    array - key list
     * @param  {} where         object || {}
     * @return []               array object
     */
    findAll: async (next, model, attributes = [], where = {}) => {
        try {
            const data = await model.findAll({
                attributes: attributes.length ? attributes : null
            }, { where: where });
            return data;
        } catch (error) {
            next(error);
        }
    },

    /**
     * @param  {} next          next
     * @param  {} model         object
     * @param  [] attributes    array - keys type string list
     * @param  _ id             primitive type
     * @return {}               object
     */
    findByPk: async (next, model, attributes = [], id) => {
        try {
            const data = await model.findByPk(id.toString(), {
                attributes: attributes.length ? attributes : null
            });
            return data;
        } catch (error) {
            next(error);
        }
    },

    /**
     * @param  {} next          next
     * @param  {} model         object
     * @param  [] attributes    array - keys type string list
     * @param  _ id             primitive type
     * @return {}               object
     */
    findOne: async (next, model, attributes = [], where = {}) => {
        try {
            const data = await model.findOne({
                attributes: attributes.length ? attributes : null
            }, { where: where });
            return data;
        } catch (error) {
            next(error);
        }
    }
}