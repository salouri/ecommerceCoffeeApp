const express = require('express');
const authController = require('../controllers/authController');
const machineController = require('../controllers/coffeeMachineController');

const router = express.Router();

//*****************************************************************/
//All below Routes are protected
router.use(authController.isAuthorized);

// Remember: '/' ==>> '/api/v1/coffee-machines/'
router
  .route('/')
  .get(machineController.getAllMachines)
  .post(machineController.createMachine);
//
module.exports = router;
