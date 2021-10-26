const express = require('express');
const authController = require('../controllers/authController');
const podController = require('../controllers/coffeePodController');

const router = express.Router();

//*****************************************************************/
//All below Routes are protected
router.use(authController.isAuthorized);

//
module.exports = router;
