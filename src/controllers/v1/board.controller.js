const Board = require("../../models").BoardModel;

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const boards = await Board.findAll({
                attributes: ['id', 'title']
            });
            return res.json({
                boards: boards
            });
        } catch (error) {
            next(error);
        }
    }
}