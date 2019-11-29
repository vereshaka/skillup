// @flow
const oracleDb = require('oracledb');
const config = require('../page_objects/utils/config');

oracleDb.autoCommit = true;

const commands = {
  businessTransactions: {
    SELECT_ALL_FOR_USER: 'SELECT * FROM business_transactions',
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transactions WHERE created_by = :created_by',
    NEW_ID: 'select business_transaction_seq.nextval from dual',
    CURRENT_ID: 'select business_transaction_seq.currval from dual',
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
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transaction_items WHERE business_transaction_id IN (SELECT id FROM business_transactions WHERE created_by = :created_by)',
    INSERT: `INSERT INTO business_transaction_items (id, business_transaction_id, status, source_party_id, source_acc_id,
                                                     source_product_sidid, target_party_id, target_acc_id,
                                                     order_id, error, source_product_id, source_acc_type,
                                                     source_phone_cc, source_phone_ndc, source_phone_sn, source_billable_user)
             VALUES (business_transaction_item_seq.nextval,
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

const execute = async (query, params) => {
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
};

const deleteAllForUser = async (username) => {
  await execute(commands.businessTransactionItems.DELETE_ALL_FOR_USER, { created_by: username });
  await execute(commands.businessTransactions.DELETE_ALL_FOR_USER, { created_by: username });
};

const selectAllForUser = async (username) => {
  await execute(commands.businessTransactionItems.SELECT_ALL_FOR_USER, { created_by: username });
  await execute(commands.businessTransactions.SELECT_ALL_FOR_USER, { created_by: username });
};

const insertTransactionForUser = async (username, status) => {
  const res = await execute(commands.businessTransactions.NEW_ID, []);
  const { rows } = res;
  const [nextValObj] = rows;
  const [NEXTVAL] = nextValObj;
  const businessTransactionNumber = NEXTVAL;

  const btBinds = {
    business_transaction_id: businessTransactionNumber,
    create_date: new Date(),
    created_by: username,
    status,
    effective_date: new Date(),
  };
  console.log(`Start Business Transaction persistence. Value: ${JSON.stringify(btBinds)}`);
  await execute(commands.businessTransactions.INSERT, btBinds);
  return businessTransactionNumber;

};

const insertTransactionItemsForTransaction = async (businessTransactionItems, businessTransactionNumber) => {
  const arrayOfPromises = businessTransactionItems.map((async (record) => {
    const itemBinds = {
      business_transaction_id: businessTransactionNumber,
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
    console.log(`Start Business Transaction Item persistence. Binds: ${JSON.stringify(itemBinds)}`);
    return execute(commands.businessTransactionItems.INSERT, itemBinds);
  }));
  await Promise.all(arrayOfPromises);
};

const insertTransactionWithItems = async (username, status, businessTransactionItems) => {
  const businessTransactionNumber = await insertTransactionForUser(username, status);
  const bT = await execute(commands.businessTransactions.SELECT_ALL_FOR_USER, { created_by: username });
  console.log(bT);
  await insertTransactionItemsForTransaction(businessTransactionItems, businessTransactionNumber);
};

module.exports.deleteAllForUser = deleteAllForUser;
module.exports.selectAllForUser = selectAllForUser;
module.exports.insertTransactionForUser = insertTransactionForUser;
module.exports.insertTransactionItemsForTransaction = insertTransactionItemsForTransaction;
module.exports.insertTransactionWithItems = insertTransactionWithItems;
