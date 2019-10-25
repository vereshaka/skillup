module.exports = {
  checkButtonExistence(buttonName) {
    cy
      .get('button')
      .contains(buttonName);
  },
};
