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
      'Coffee pod must have a product type (e.g. large, small, espresso)',
    ],
  },
  flavor: {
    type: String,
    trim: true,
    enum: ['vanilla', 'caramel', 'psl', 'mocha', 'hazelnut'],
    required: [
      true,
      'Coffee pod must have a flavor (e.g. vanilla, carmel, psl, mocha, hazelnut)',
    ],
  },
  packSize: {
    type: Number,
    enum: [1, 3, 5, 7],
    required: [true, 'Coffee pod must have a pack size (e.g. 1,3,5,7)'],
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

// Enforce res.json(), JSON.stringify() and toObject() functions outputs to include virtuals
const schemaOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const coffeePodSchema = new mongoose.Schema(schemaDefinition, schemaOptions);

//DOCUMENT MIDDLEWARE: runs before .save() and .create() commands only
coffeePodSchema.pre('save', function (next) {
  let sku =
    this.productType === 'espresso'
      ? 'EP0'
      : this.productType === 'small'
      ? 'CP0'
      : 'CP1';

  switch (this.flavor) {
    case 'vanilla':
      sku += '0';
      break;
    case 'caramel':
      sku += '1';
      break;
    case 'psl':
      sku += '2';
      break;
    case 'mocha':
      sku += '3';
      break;
    case 'hazelnut':
      sku += '4';
      break;
  }
  sku += this.packSize;
  this.sku = sku;
  next();
});

// automatically creates collection "coffeepods"  (if it doesn't exist)
const CoffeePod = mongoose.model('CoffeePod', coffeePodSchema);

module.exports = CoffeePod;
