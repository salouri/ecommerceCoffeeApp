const mongoose = require('mongoose');

//
const schemaDefinition = {};
const schemaOptions = {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true }, // So `toObject()` output includes virtuals
};

const coffeePodSchema = new mongoose.Schema(schemaDefinition, schemaOptions);

const CoffeePod = mongoose.model('CoffeePod', coffeePodSchema); // automatically creates collection "coffeepods"

module.exports = CoffeePod;
