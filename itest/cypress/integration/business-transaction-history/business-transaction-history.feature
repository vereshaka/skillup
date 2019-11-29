Feature: Business Transaction History

  Scenario: Login with admin rights
    Given user3 exists in GUCCI keycloak with the following groups:
      | Group          |
      | hfhs-superuser |
    And I open GUCCI Portal as user3
    When switch to HFHS Cockpit
    Then I should see active 'Product Move' button
    And business transaction history widget is displayed
    And transaction list mode group is presented

  Scenario: Login with user rights
    Given user2 exists in GUCCI keycloak with the following groups:
      | Group     |
      | hfhs-user |
    And I open GUCCI Portal as user2
    When switch to HFHS Cockpit
    Then I should see active 'Product Move' button
    And business transaction history widget is displayed
    And transaction list mode group is not presented


  Scenario: Check lack of transactions
    Given user3 has no business transactions
    And I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    Then I see 'no transactions' that were 'taken place' in the last month


  Scenario: Check latest transaction
    Given user3 has business transaction that was 'taken place' today with items
      | status | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | done   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'my transactions' that were 'taken place' in the last month
      | TransactionType | User  | CreationDate | Count |
      | Product Move    | user3 | today        | 1     |
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab
      | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount | SourceProductSid                | SourceBillableUser | SourceAccount | Order   |
      | Product Move    | user3 | today        | 1     | today         | A604916029    | BPO_A1_HYBRID_POWER_150_40_2016 | null               | A548334910    | CO99571 |

  @focus
  Scenario: Check latest successfully finished transaction
    Given user3 has business transaction that was 'done' today with items
      | status | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | done   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'my transactions' that were 'done' in the last month
      | TransactionType | User  | CreationDate | Count |
      | Product Move    | user3 | today        | 1     |
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab
      | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount | SourceProductSid                | SourceBillableUser | SourceAccount | Order   |
      | Product Move    | user3 | today        | 1     | today         | A604916029    | BPO_A1_HYBRID_POWER_150_40_2016 | null               | A548334910    | CO99571 |


  Scenario: Check latest transaction finished with error
    Given user3 has business transaction that was 'done with error' today with items
      | status       | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | with_error   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'my transactions' that were 'done with error' in the last month
      | TransactionType | User  | CreationDate | Count |
      | Product Move    | user3 | today        | 1     |
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab
      | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount | SourceProductSid                | SourceBillableUser | SourceAccount | Order   |
      | Product Move    | user3 | today        | 1     | today         | A604916029    | BPO_A1_HYBRID_POWER_150_40_2016 | null               | A548334910    | CO99571 |

