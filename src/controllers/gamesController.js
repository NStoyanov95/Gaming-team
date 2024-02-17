const router = require('express').Router();

const gamesService = require('../services/gamesService');

const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth, isOwner } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('games/create');
});

router.post('/create', isAuth, async (req, res) => {
    const gameData = req.body;
    gameData.owner = req.user._id;

    try {
        await gamesService.create(gameData);
        res.redirect('/games/catalog');
    } catch (error) {
        res.render('games/create', { error: getErrorMessage(error) })
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const games = await gamesService.getAll().lean();
        res.render('games/catalog', { games });
    } catch (error) {
        res.redirect('/404')
    }
});

router.get('/:gameId/details', async (req, res) => {
    try {
        const game = await gamesService.getOne(req.params.gameId).lean().populate('boughtBy');
        const isUser = req.user;
        const isOwner = game.owner == req.user?._id;
        const isBuyer = game.boughtBy.some(x => x._id == req.user?._id);
        res.render('games/details', { game, isUser, isOwner, isBuyer });
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:gameId/buy', isAuth, async (req, res) => {
    try {
        await gamesService.update(req.params.gameId, req.user);
        res.redirect(`/games/${req.params.gameId}/details`);
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:gameId/delete', isAuth, isOwner, async (req, res) => {
    try {
        await gamesService.delete(req.params.gameId);
        res.redirect('/games/catalog');
    } catch (error) {
        res.redirect('/404');

    }
});

router.get('/:gameId/edit', isAuth, isOwner, async (req, res) => {
    try {
        const game = await gamesService.getOne(req.params.gameId).lean();
        res.render('games/edit', { game })
    } catch (error) {

    }
});

router.post('/:gameId/edit', isAuth, isOwner, async (req, res) => {
    const game = req.body;

    try {
        await gamesService.edit(req.params.gameId, game);
        res.redirect(`/games/${req.params.gameId}/details`);
    } catch (error) {
        res.render('games/edit', { error: getErrorMessage(error), game })
    }
});

router.get('/search', async (req, res) => {
    try {
        const games = await gamesService.getAll().lean();
        res.render('games/search', { games })
    } catch (error) {
        res.redirect('/404')
    }
});

router.post('/search', async (req, res) => {
    const { name, platform } = req.body;
    try {
        const games = await gamesService.search(name, platform).lean();
        res.render('games/search', { games });
    } catch (error) {
        res.redirect('/404');
    }
});





module.exports = router;