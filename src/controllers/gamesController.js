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
        res.redirect('/')
    } catch (error) {
        res.render('games/create', { error: getErrorMessage(error) })
    }
});





module.exports = router;