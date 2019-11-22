// @flow
const oracleDb = require('oracledb');
const config = require('../page_objects/utils/config');

const commands = {
  businessTransactions: {
    SELECT_ALL_FOR_USER: 'SELECT * FROM business_transactions WHERE created_by = :created_by',
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transactions WHERE created_by = :created_by',
    NEW_ID: 'select business_transaction_seq.nextval from dual',
    INSERT: `INSERT
             INTO BUSINESS_TRANSACTIONS
             (id,
              created_by,
              effective_date)
             VALUES (:business_transaction_id,
                     :created_by,
                     :effective_date)`,
  },
  businessTransactionItems: {
    SELECT_ALL_FOR_USER: 'SELECT * FROM business_transaction_items WHERE business_transaction_id = (SELECT id FROM business_transactions WHERE created_by = :created_by)',
    DELETE_ALL_FOR_USER: 'DELETE FROM business_transaction_items WHERE business_transaction_id = (SELECT id FROM business_transactions WHERE created_by = :created_by)',
    INSERT: `INSERT INTO business_transaction_items (id, business_transaction_id, source_party_id, source_acc_id,
                                                     source_phone_cc, source_phone_ndc, source_phone_sn,
                                                     source_product_sidid, target_party_id, target_acc_id,
                                                     source_product_id, source_acc_type, source_billable_user)
             VALUES (business_transaction_item_seq.nextval,
                     :business_transaction_id,
                     :source_party_id,
                     :source_acc_id,
                     :source_phone_cc,
                     :source_phone_ndc,
                     :source_phone_sn,
                     :source_product_sidid,
                     :target_party_id,
                     :target_acc_id,
                     :source_product_id,
                     :source_acc_type,
                     :source_billable_user)`,
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
    const result = await connection.execute(query, params);
    console.log(result);
  } catch (err) {
    console.error(err);
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

const createBtExecute = async (username, businessTransaction, businessTransactionItems) => {
  const res = await execute(commands.businessTransactions.NEW_ID, [], { outFormat: oracleDb.OBJECT });
  const { rows } = res;
  const [nextValObj] = rows;
  const { NEXTVAL } = nextValObj;
  const businessTransactionNumber = NEXTVAL;
  console.log(`New ID for business transaction is ${businessTransactionNumber}`);
  const btBinds = {
    business_transaction_id: businessTransactionNumber,
    created_by: businessTransaction.created_by,
    effective_date: businessTransaction.effective_date,
  };
  console.log(`Start Business Transaction persistence. Value: ${JSON.stringify(btBinds)}`);
  await execute(commands.businessTransactions.INSERT, btBinds);

  const arrayOfPromises = businessTransactionItems.forEach((async (record) => {
    const itemBinds = {
      business_transaction_id: record.business_transaction_id,
      source_party_id: record.source_party_id,
      source_acc_id: record.source_acc_id,
      source_phone_cc: record.source_phone_cc,
      source_phone_ndc: record.source_phone_ndc,
      source_phone_sn: record.source_phone_sn,
      source_product_sidid: record.source_product_sidid,
      target_party_id: record.target_party_id,
      target_acc_id: record.target_acc_id,
      source_product_id: record.source_product_id,
      source_acc_type: record.source_acc_type,
      source_billable_user: record.source_billable_user,
    };
    console.log(`Start Business Transaction Item persistence. Binds: ${JSON.stringify(itemBinds)}`);
    return execute(commands.businessTransactionItems.INSERT, itemBinds);
  }));
  await Promise.all(arrayOfPromises);
  return businessTransactionNumber;
};

const deleteAllForUser = async (username) => {
  await execute(commands.businessTransactionItems.DELETE_ALL_FOR_USER, { created_by: username });
  await execute(commands.businessTransactions.DELETE_ALL_FOR_USER, { created_by: username });
};

const selectAllForUser = async (username) => {
  await execute(commands.businessTransactionItems.SELECT_ALL_FOR_USER, { created_by: username });
  await execute(commands.businessTransactions.SELECT_ALL_FOR_USER, { created_by: username });
};

const insertTransactionForUser = (username, businessTransaction, businessTransactionItems) => {
  createBtExecute(username, businessTransaction, businessTransactionItems).then((r) => console.log('inserted record ', r));
};

module.exports.deleteAllForUser = deleteAllForUser;
module.exports.selectAllForUser = selectAllForUser;
module.exports.insertTransactionForUser = insertTransactionForUser;
