const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');

const gamesService = require('../services/gamesService');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, ENV.SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuth = true;
        return next();

    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }

    next();
};

exports.isOwner = async (req, res, next) => {
    const game = await gamesService.getOne(req.params.gameId);

    if (game.owner == req.user?._id) {
        return next()
    }

    return res.redirect('/404');
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/404')
    }

    return next();
}