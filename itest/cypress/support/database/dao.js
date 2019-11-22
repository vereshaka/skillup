// @flow
const oracleDb = require('oracledb');
const config = require('../page_objects/utils/config');

const commands = {
  businessTransactions: {
    SELECT_ALL_FOR_USER: 'SELECT * FROM business_transactions WHERE created_by = :created_by',
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transactions WHERE created_by = :created_by',
  },
  businessTransactionItems: {
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transaction_items WHERE business_transaction_id = (SELECT id FROM business_transactions WHERE created_by = :created_by)',
  },
};

async function execute(query, params) {
  let connection;

  try {
    connection = await oracleDb.getConnection({
      user: config.getDbUsername(),
      password: config.getDbPassword(),
      connectString: config.getDbConnectionString(),
    });

    return await connection.execute(query, params);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        // Do nothing
      }
    }
  }
}

const deleteAllForUser = async (username) => {
  await execute(commands.businessTransactionItems.DELETE_ALL_FOR_USER, { username });
  await execute(commands.businessTransactions.DELETE_ALL_FOR_USER, { username });
};
const selectAllForUser = async (username) => {
  await execute(commands.businessTransactions.SELECT_ALL_FOR_USER, { username });
};

module.exports.deleteAllForUser = deleteAllForUser;
module.exports.selectAllForUser = selectAllForUser;
