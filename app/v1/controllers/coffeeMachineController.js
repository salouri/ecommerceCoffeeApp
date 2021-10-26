const Machine = require('../models/coffeeMachineModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//---------------------------------------------------------------------------
exports.getAllMachines = factory.getAll(Machine);

exports.createMachine = factory.createOne(Machine);
exports.getMachine = factory.getOne(Machine);
exports.updateMachine = factory.updateOne(Machine);
exports.deleteMachine = factory.deleteOne(Machine);
