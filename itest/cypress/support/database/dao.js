// @flow
const oracleDb = require('oracledb');

oracleDb.autoCommit = true;

const commands = {
  businessTransactions: {
    SELECT_ALL_FOR_USER: 'SELECT * FROM business_transactions WHERE created_by = :created_by',
    DELETE_BY_ID: 'DELETE FROM business_transactions WHERE id = :business_transaction_id',
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transactions WHERE created_by = :created_by',
    INSERT: `INSERT
             INTO BUSINESS_TRANSACTIONS
             (id,
              create_date,
              created_by,
              status,
              effective_date)
             VALUES (:business_transaction_id,
                     :create_date,
                     :created_by,
                     :status,
                     :effective_date)`,
  },
  businessTransactionItems: {
    SELECT_ALL_FOR_USER: 'SELECT * FROM business_transaction_items',
    DELETE_BY_BUSINESS_TRANSACTION_ID: 'DELETE FROM business_transaction_items WHERE business_transaction_id = :business_transaction_id',
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transaction_items WHERE business_transaction_id IN (SELECT id FROM business_transactions WHERE created_by = :created_by)',
    INSERT: `INSERT INTO business_transaction_items (id, business_transaction_id, status, source_party_id, source_acc_id,
                                                     source_product_sidid, target_party_id, target_acc_id,
                                                     order_id, error, source_product_id, source_acc_type,
                                                     source_phone_cc, source_phone_ndc, source_phone_sn, source_billable_user)
             VALUES (:business_transaction_item_id,
                     :business_transaction_id,
                     :status,
                     :source_party_id,
                     :source_acc_id,
                     :source_product_sidid, 
                     :target_party_id, 
                     :target_acc_id,
                     :order_id, 
                     :error,
                     :source_product_id, 
                     :source_acc_type,
                     :source_phone_cc, 
                     :source_phone_ndc, 
                     :source_phone_sn, 
                     :source_billable_user)`,
  },
};

const execute = async (query, params, dbParams) => {
  let connection;
  try {
    connection = await oracleDb.getConnection({
      user: dbParams.dbUsername,
      password: dbParams.dbPassword,
      connectString: dbParams.dbConnectionString,
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
};

const deleteAllForUser = async (username, dbParams) => {
  await execute(commands.businessTransactionItems.DELETE_ALL_FOR_USER, { created_by: username }, dbParams);
  await execute(commands.businessTransactions.DELETE_ALL_FOR_USER, { created_by: username }, dbParams);
};

const deleteById = async (id, dbParams) => {
  await execute(commands.businessTransactionItems.DELETE_BY_BUSINESS_TRANSACTION_ID, { business_transaction_id: id }, dbParams);
  await execute(commands.businessTransactions.DELETE_BY_ID, { business_transaction_id: id }, dbParams);
};

const insertTransactionForUser = async (username, id, status, dbParams) => {
  const btBinds = {
    business_transaction_id: id,
    create_date: new Date(),
    created_by: username,
    status,
    effective_date: new Date(),
  };
  await execute(commands.businessTransactions.INSERT, btBinds, dbParams);
};

const insertTransactionItemsForTransaction = async (businessTransactionItems, id, dbParams) => {
  const arrayOfPromises = businessTransactionItems.map((async (record) => {
    const itemBinds = {
      business_transaction_item_id: record.business_transaction_item_id,
      business_transaction_id: id,
      status: record.status,
      source_party_id: record.source_party_id,
      source_acc_id: record.source_acc_id,
      source_product_sidid: record.source_product_sidid,
      target_party_id: record.target_party_id,
      target_acc_id: record.target_acc_id,
      order_id: record.order_id,
      error: record.error,
      source_product_id: record.source_product_id,
      source_acc_type: record.source_acc_type,
      source_phone_cc: record.source_phone_cc,
      source_phone_ndc: record.source_phone_ndc,
      source_phone_sn: record.source_phone_sn,
      source_billable_user: record.source_billable_user,
    };
    return execute(commands.businessTransactionItems.INSERT, itemBinds, dbParams);
  }));
  await Promise.all(arrayOfPromises);
};

const insertTransactionWithItems = async (username, id, status, businessTransactionItems, dbParams) => {
  await insertTransactionForUser(username, id, status, dbParams);
  await insertTransactionItemsForTransaction(businessTransactionItems, id, dbParams);
};

module.exports.deleteById = deleteById;
module.exports.deleteAllForUser = deleteAllForUser;
module.exports.insertTransactionForUser = insertTransactionForUser;
module.exports.insertTransactionItemsForTransaction = insertTransactionItemsForTransaction;
module.exports.insertTransactionWithItems = insertTransactionWithItems;
