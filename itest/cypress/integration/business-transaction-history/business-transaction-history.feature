Feature: Business Transaction History

  @focus
  Scenario: Check lack of transactions
    Given hfhs-user3 has no business transactions
    And I open GUCCI Portal as hfhs-user3
    And switch to HFHS Cockpit
    And open 'Business Transaction History' widget from 'HFHS Cockpit'
    And business transaction history widget is displayed
    And transaction list mode group is presented
    When I have selected 'my transactions' that were 'taken place' in the 'last month'
    Then 'no transaction' message should be displayed

  @focus
  Scenario: Check latest transaction
    Given hfhs-user3 has PM business transaction #1 that was 'taken place' today with items
      | status | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | done   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as hfhs-user3
    And switch to HFHS Cockpit
    And open 'Business Transaction History' widget from 'HFHS Cockpit'
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'my transactions' that were 'taken place' in the 'last month'
      | TransactionType | User  | CreationDate | Count |
      | Product Move    | user3 | today        | 1     |
    When I select business transaction #1
    Then new tab with caption 'Product Move #1' should be displayed

  @focus
  Scenario: Check latest successfully finished transaction
    Given hfhs-user3 has PM business transaction #2 that was 'done' today with items
      | status | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | done   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as hfhs-user3
    And switch to HFHS Cockpit
    And open 'Business Transaction History' widget from 'HFHS Cockpit'
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'my transactions' that were 'done' in the 'last month'
      | TransactionType | User  | CreationDate | Count |
      | Product Move    | user3 | today        | 1     |
    When I select business transaction #2
    Then new tab with caption 'Product Move #2' should be displayed

  @focus
  Scenario: Check latest transaction finished with error
    Given hfhs-user3 has PM business transaction #3 that was 'done with error' today with items
      | status     | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | with_error | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as hfhs-user3
    And switch to HFHS Cockpit
    And open 'Business Transaction History' widget from 'HFHS Cockpit'
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'my transactions' that were 'done with error' in the 'last month'
      | TransactionType | User  | CreationDate | Count |
      | Product Move    | user3 | today        | 1     |
    When I select business transaction #3
    Then new tab with caption 'Product Move #3' should be displayed
