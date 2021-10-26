const Pod = require('../models/coffeePodModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//---------------------------------------------------------------------------
exports.getAllPods = factory.getAll(Pod);

exports.createPod = factory.createOne(Pod);
exports.getPod = factory.getOne(Pod);
exports.updatePod = factory.updateOne(Pod);
exports.deletePod = factory.deleteOne(Pod);
