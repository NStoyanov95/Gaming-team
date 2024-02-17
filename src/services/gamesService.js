const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData, { runValidators: true })

exports.getAll = () => Game.find();

exports.getOne = (gameId) => Game.findById(gameId);

exports.update = (gameId, userId) => Game.findByIdAndUpdate(gameId, { $push: { 'boughtBy': userId } });

exports.search = (name, platform) => Game.find({ name: new RegExp(name, 'i'), platform: new RegExp(platform, 'i') });