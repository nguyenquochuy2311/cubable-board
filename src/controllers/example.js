module.exports = {
    // GET
    getAll: async (req, res, next) => {
        try {
            return res.json({});
        } catch (error) {
            next(error);
        }
    },

    // GET - /:id
    getById: async (req, res, next) => {
        try {
            return res.json({});
        } catch (error) {
            next(error);
        }
    },

    // POST
    create: async (req, res, next) => {
        try {
            return res.json({});
        } catch (error) {
            next(error);
        }
    },

    // PUT - /:id
    update: async (req, res, next) => {
        try {
            try {
                return res.json({});
            } catch (error) {
                next(error);
            }
        } catch (error) {
            next(error);
        }
    },

    // DELETE - /:id
    destroy: async (req, res, next) => {
        try {
            try {
                return res.json({});
            } catch (error) {
                next(error);
            }
        } catch (error) {
            next(error);
        }
    }
}