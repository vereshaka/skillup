const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack.config.js');
const db = require('../../cypress/support/database/dao');

module.exports = (on) => {
  const options = {
    webpackOptions,
  };
  on('file:preprocessor', webpack(options));

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--incognito');
      return args;
    }
    return 0;
  });

  on('task', {
    'selectAllForUser:db': async ({ username }) => {
      await db.selectAllForUser(username);
      return 0;
    },
    'deleteAllForUser:db': async ({ username }) => {
      await db.deleteAllForUser(username);
      return 0;
    },
    'insertTransactionForUser:db': async ({ username, businessTransactionDate }) => {
      await db.insertTransactionForUser(username, businessTransactionDate);
      return 0;
    },
    'insertTransactionItemsForTransaction:db': async ({ businessTransactionItems, businessTransactionNumber }) => {
      await db.insertTransactionItemsForTransaction(businessTransactionItems, businessTransactionNumber);
      return 0;
    },
    'insertTransactionWithItems:db': async ({ username, businessTransactionDate, businessTransactionItems }) => {
      await db.insertTransactionWithItems(username, businessTransactionDate, businessTransactionItems);
      return 0;
    },
  });
};
