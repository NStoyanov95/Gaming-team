const router = require('express').Router();

const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', (req, res) => {
    res.render('games/create');
});

router.post('/create', async (req, res) => {
    const gameData = req.body;

    try {
        await gamesService.create(gameData);
        res.redirect('/')
    } catch (error) {
        res.render('games/create', { error: getErrorMessage(error) })
    }
})





module.exports = router;