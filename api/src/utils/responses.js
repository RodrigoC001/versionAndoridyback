
exports.ok = function ok(data, message) {
  return {
    status: 200,
    data,
    message: message || 'Success.',
  };
};


exports.created = function created(data, message) {
  return {
    status: 201,
    data,
    message: message || 'Created.',
  };
};

// Deleted sends a 204(No Content), so no data is sent.
// If you want to send data after deletion use ok status.
exports.deleted = function deleted(message) {
  return {
    status: 204,
    message: message || 'Deleted.',
  };
};


exports.unauthorized = function unauthorized(data, message) {
  return {
    status: 401,
    data,
    message: message || 'Unauthorized.',
  };
};

exports.forbidden = function forbidden(data, message) {
  return {
    status: 403,
    data,
    message: message || 'Forbidden.',
  };
};

exports.badRequest = function badRequest(data, message) {
  return {
    status: 400,
    data,
    message: message || 'Bad Request.',
  };
};

exports.error = function error(data, message) {
  return {
    status: 500,
    data,
    message: message || 'Error on the Server.',
  };
};
