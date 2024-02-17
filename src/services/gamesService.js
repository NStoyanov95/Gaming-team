const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.getAll = () => Game.find();

exports.getOne = (gameId) => Game.findById(gameId);

exports.update = (gameId, userId) => Game.findByIdAndUpdate(gameId, {$push: {'boughtBy': userId}});