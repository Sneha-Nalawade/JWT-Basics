const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {CustomAPIError, BadRequestError, UnauthenticatedError};

// once we create such separate and error-specific files inside error folder, 3 files had to be edited accordingly (by modifying customAPIErrors with specific errors like bad-request, unauthorized)
//those 3 files being: controller>main.js, middleware>auth.js, and middleware>errorHandler