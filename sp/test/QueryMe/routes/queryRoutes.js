var express = require('express');
var router = express.Router();
var queryController = require('../controllers/queryController.js');

/*
 * GET
 */
router.get('/', queryController.list);

/*
 * GET
 */
router.get('/:id', queryController.show);

/*
 * POST
 */
router.post('/', queryController.create);

/*
 * PUT
 */
router.put('/:id', queryController.update);

/*
 * DELETE
 */
router.delete('/:id', queryController.remove);

module.exports = router;
