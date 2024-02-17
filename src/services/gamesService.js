const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getOne = (gameId) => Game.findById(gameId);