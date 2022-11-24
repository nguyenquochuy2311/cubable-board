"use strict";

var createError = require("http-errors");

var Board = require("../../../models").BoardModel;

var BoardItem = require("../../../models").BoardItemModel;

var BoardField = require("../../../models").BoardFieldModel;

var Field = require("../../../models").FieldModel;

var validateCreateBoardForm = require("../../../validation/board/create");

module.exports = {
  // GET
  getAll: function getAll(req, res, next) {
    var boards;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Board.findAll({
              attributes: ["id", "title"]
            }));

          case 3:
            boards = _context.sent;
            return _context.abrupt("return", res.json({
              boards: boards
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  // GET - /:id
  getById: function getById(req, res, next) {
    var boardId, board, boardItems;
    return regeneratorRuntime.async(function getById$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            boardId = req.params.id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Board.findByPk(boardId, {
              attributes: ["id", "title"],
              include: [{
                model: BoardItem,
                as: "boardItems",
                attributes: ["id", "name"],
                include: [{
                  model: Field,
                  as: "boardItemFields"
                }] // where: {
                // }

              }] // {
              //     include: [{
              //         model: Field,
              //         as: "boardFields",
              //         attributes: ["id", "boardId"]
              //     }]
              // }

            }));

          case 4:
            board = _context2.sent;
            boardItems = board.boardItems; // const boardFields = board.boardFields;
            // const boardItemIncludeFields = {};
            // for (const boardItem of boardItems) {
            //     console.log(boardItem);
            // }
            // console.log(board);

            boardItems.forEach(function (boardItemEle, index) {
              var itemField = boardItemEle.boardItemFields;
              console.log(index, itemField.id);
            });
            return _context2.abrupt("return", res.json(board));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 11]]);
  },
  // POST
  create: function create(req, res, next) {
    var board, boardSaved;
    return regeneratorRuntime.async(function create$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            board = req.body;
            _context3.next = 4;
            return regeneratorRuntime.awrap(validateCreateBoardForm(board));

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(Board.create(board));

          case 6:
            boardSaved = _context3.sent;
            return _context3.abrupt("return", res.json(boardSaved));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  // PUT - /:id
  update: function update(req, res, next) {
    var boardId, board, title, boardUpdated;
    return regeneratorRuntime.async(function update$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            boardId = req.params.id;
            _context4.next = 4;
            return regeneratorRuntime.awrap(Board.findByPk(boardId));

          case 4:
            board = _context4.sent;

            if (board) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", next(createError.BadRequest("Board not found")));

          case 7:
            title = req.body.title;
            _context4.next = 10;
            return regeneratorRuntime.awrap(Board.update({
              title: title || board.title
            }, {
              where: {
                id: boardId
              }
            }));

          case 10:
            boardUpdated = _context4.sent;
            return _context4.abrupt("return", boardUpdated[0] ? res.json({
              message: "Update success"
            }) : next(createError.BadRequest("Update failed")));

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 14]]);
  },
  // DELETE - /:id
  destroy: function destroy(req, res, next) {
    var boardId, board, boardDeleted;
    return regeneratorRuntime.async(function destroy$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            boardId = req.params.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(Board.findByPk(boardId));

          case 4:
            board = _context5.sent;

            if (board) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", next(createError.BadRequest("Board not found")));

          case 7:
            _context5.next = 9;
            return regeneratorRuntime.awrap(Board.destroy({
              where: {
                id: boardId
              }
            }));

          case 9:
            boardDeleted = _context5.sent;
            return _context5.abrupt("return", boardDeleted ? res.json({
              message: "Delete success"
            }) : next(createError.BadRequest("Delete failed")));

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 13]]);
  }
};