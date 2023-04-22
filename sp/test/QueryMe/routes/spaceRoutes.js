const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController.js');

router.get('/:id', spaceController.show.bind(spaceController));
 
router.post('/', spaceController.create.bind(spaceController));
 
router.put('/:id', spaceController.update.bind(spaceController));
 
router.delete('/:id', spaceController.remove.bind(spaceController));

module.exports = router;

