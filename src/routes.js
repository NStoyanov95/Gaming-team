const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const gamesController = require('./controllers/gamesController');

router.use(homeController);
router.use('/auth', authController);
router.use('/games', gamesController);



module.exports = router;