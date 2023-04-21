const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

/*
* APP Routes
*/
router.get('/api/test/', testController.listEntries);
router.post('/api/test/', testController.insertSingleEntry); 
router.patch('/api/test/:id', testController.updateSingleEntry); 
router.delete('/api/test/:id', testController.deleteSingleEntry); 

module.exports = router;