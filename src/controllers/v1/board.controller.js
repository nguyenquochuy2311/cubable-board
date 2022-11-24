const Board = require("../../models").BoardModel;

module.exports = {
    getAll: async(req, res, next) => {
        try {
            const boards = await Board.find();
            return res.json({
                boards: boards
            });
        } catch (error) {
            next(error);
        }
    }
}