const mongoose = require('mongoose');

//
const schemaDefinition = {};
const schemaOptions = {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true }, // So `toObject()` output includes virtuals
};

const coffeeMachineSchema = new mongoose.Schema(
  schemaDefinition,
  schemaOptions
);

const CoffeeMachine = mongoose.model('CoffeeMachine', coffeeMachineSchema); // automatically creates collection "coffeemachines"

module.exports = CoffeeMachine;
