const catchAsync = require('../utils/catchAsync');

//---------------------------------------------------------------------------
// async func bc we will use db operations(return promises)
exports.signup = catchAsync(async (req, res, next) => {
  next();
}); // end-of signup handler

//---------------------------------------------------------------------------
exports.login = catchAsync(async (req, res, next) => {
  next();
}); //end-of login handler

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
// isLoggedIn MIDDLEWARE: to be used for rendered pages ONLY(no errors)
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  next();
}); //end-of isLoggedIn middleware

//---------------------------------------------------------------------------
// "PROTECT" MIDDLEWARE method
exports.isAuthorized = catchAsync(async (req, res, next) => {
  next();
}); //end-of isAuthorized middleware

//---------------------------------------------------------------------------
//restrictTo is a function that passes [roles] and wraps a MIDDLEWARE function
exports.restrictTo = (...roles) => {
  next();
}; //end-of restrictTo
