const APIFeatures = require('../utils/apiFeatures'); // includes our search/filter/limit/paginate methods
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const { collectionName } = Model.collection;

    const features = new APIFeatures(Model, req.query)
      .search()
      .sort()
      .filter()
      .paginate();

    const docs = await features.modelQuery; // .modelQuery = model.find();
    // const docs = await features.modelQuery.explain(); // to shows more stats on the query
    let myDocs = {};
    if (docs.length > 0) {
      docs.forEach((doc) => {
        console.log(doc.sku);
        myDocs[doc.sku] = doc;
      });
    }
    // SEND RESULTS
    res.status(200).json({
      status: 'success',
      results: docs.length,
      requestedAt: req.requestTime,
      data: myDocs,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.collection.collectionName.slice(0, -1);
    let doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }
    if (populateOptions) doc = doc.populate(populateOptions);

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.collection.collectionName.slice(0, -1);
    const newDoc = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: newDoc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.collection.collectionName.slice(0, -1);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true /* return the new modified document */,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc, // using "Value Shorthand" in es6
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.collection.collectionName.slice(0, -1);
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
