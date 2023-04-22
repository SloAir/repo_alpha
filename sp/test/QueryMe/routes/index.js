const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController')

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const spaces = await spaceController.list();
        res.render('index', {
            title: 'QueryMe',
            session: req.session,
            spaces: spaces
        });
    }
    catch (err) {
        res.status(500).json({
            // TODO: redirect to 500
            message: 'Error when getting spaces.',
            error: err
        });
    }
});

module.exports = router;
