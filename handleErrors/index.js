const { ValidationError } = require("sequelize");

module.exports = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({ errors: [err.errors[0].message] });
  }
  res.status(err.status || 500).send({ errors: [err.message] });
};
