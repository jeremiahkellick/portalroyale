const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateStatInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Stat name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};