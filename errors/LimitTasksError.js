const ApplicationError = require("./ApplicationError");

class LimitTasksError extends ApplicationError {
  constructor(message) {
    super(403, message || "Limit tasks reached");
  }
}

module.exports = LimitTasksError;
