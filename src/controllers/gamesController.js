const router = require('express').Router();

const gamesService = require('../services/gamesService');

const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', (req, res) => {
    res.render('games/create');
});

router.post('/create', async (req, res) => {
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

router.get('/:gameId/buy', async (req, res) => {
    try {
        await gamesService.update(req.params.gameId, req.user);
        res.redirect(`/games/${req.params.gameId}/details`);
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:gameId/delete', async(req, res) => {
    try {
        await gamesService.delete(req.params.gameId);
        res.redirect('/games/catalog');
    } catch (error) {
        res.redirect('/404');
        
    }
});

router.get('/:gameId/edit', async(req,res)=>{
    try {
        const game = await gamesService.getOne(req.params.gameId).lean();
        res.render('games/edit', {game})
    } catch (error) {
        
    }
})







module.exports = router;