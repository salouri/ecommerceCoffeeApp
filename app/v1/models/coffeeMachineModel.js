const mongoose = require('mongoose');

//
const schemaDefinition = {
  sku: {
    type: String,
    trim: true,
    match: /^[A-Z]{2}[0-9]{3}$/i, // a string that starts with two Capital letters followed by 3 digits
    index: true,
    unique: true,
    sparse: true,
  },
  productType: {
    type: String,
    trim: true,
    enum: ['large', 'small', 'espresso'],
    required: [
      true,
      'Coffee machine must have a product type (e.g. large, small, espresso)',
    ],
  },
  waterLineCompatible: {
    type: Boolean,
    default: false,
    required: true,
  },
  version: {
    type: String,
    trim: true,
    enum: ['base', 'premium', 'deluxe'],
    required: [
      true,
      'Coffee machine must have a version (e.g. base, premium, deluxe)',
    ],
  },
  availableQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};
// Enforce res.json() , JSON.stringify() and toObject() functions outputs to include virtuals
const schemaOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const coffeeMachineSchema = new mongoose.Schema(
  schemaDefinition,
  schemaOptions
);

//DOCUMENT MIDDLEWARE: runs before .save() and .create() commands only
coffeeMachineSchema.pre('save', function (next) {
  let sku =
    this.productType === 'espresso'
      ? 'EM0'
      : this.productType === 'small'
      ? 'CM0'
      : 'CM1';
  sku += 0;
  switch (this.version) {
    case 'base':
      sku += '1';
      break;
    case 'premium':
      sku += '2';
      break;
    case 'deluxe':
      sku += '3';
      break;
  }
  this.sku = sku;
  next();
});

// automatically creates collection "coffeemachines" (if it doesn't exist)
const CoffeeMachine = mongoose.model('CoffeeMachine', coffeeMachineSchema);

module.exports = CoffeeMachine;
