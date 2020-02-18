const localisation = require('../../localisation/localisation');

const getPassword = (username) => username;
const getValue = (parameterName) => {
  const locale = localisation[Cypress.env('localisation')];
  return locale[`${parameterName}`];
};

module.exports.getPassword = getPassword;
module.exports.getValue = getValue;
