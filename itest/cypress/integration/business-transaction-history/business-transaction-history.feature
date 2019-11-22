Feature: Business Transaction History

#  @focus
  Scenario: Login with admin rights
    Given user3 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-superuser|
    And I open GUCCI Portal as user3
    When switch to HFHS Cockpit
    Then I should see active 'Product Move' button
    And business transaction history widget is displayed
    And transaction list mode group is presented

#  @focus
  Scenario: Login with user rights
    Given user2 exists in GUCCI keycloak with the following groups:
      | Group |
      | hfhs-user|
    And I open GUCCI Portal as user2
    When switch to HFHS Cockpit
    Then I should see active 'Product Move' button
    And business transaction history widget is displayed
    And transaction list mode group is not presented

#  @focus
  Scenario: Check latest transaction
    Given I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'all transactions' that were 'taken place' in the last month
      | TransactionId | TransactionType | User | CreationDate | Count |
      |               |                 |      |              |       |
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab
      | TransactionId | TransactionType | User | CreationDate | Count | EffectiveDate | TargetAccount |
      |               |                 |      |              |       |               |               |

  @focus
  Scenario: Check latest successfully finished transaction
#    Given user3 has no business transactions
    Given user3 has business transaction
      | business_transaction_id | created_by | effective_date |
      | business_transaction_id | created_by | effective_date |
    And business transactions has items
      | business_transaction_id | source_party_id | source_acc_id | source_phone_cc | source_phone_ndc | source_phone_sn | source_product_sidid | target_party_id | target_acc_id | source_product_id | source_acc_type | source_billable_user |
      | business_transaction_id | source_party_id | source_acc_id | source_phone_cc | source_phone_ndc | source_phone_sn | source_product_sidid | target_party_id | target_acc_id | source_product_id | source_acc_type | source_billable_user |
    Given I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'all transactions' that were 'done' in the last month
      | TransactionId | TransactionType | User | CreationDate | Count |
      |               |                 |      |              |       |
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab
      | TransactionId | TransactionType | User | CreationDate | Count | EffectiveDate | TargetAccount |
      |               |                 |      |              |       |               |               |

#  @focus
  Scenario: Check latest transaction finished with error
    Given I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I see 'all transactions' that were 'done with error' in the last month
      | TransactionId | TransactionType | User  | CreationDate | Count |
      | 542           | Product Move    | admin | 14/11/2019   | 1     |
      | 541           | Product Move    | admin | 14/11/2019   | 1     |
    When I select latest business transaction
    Then latest business transaction's info is displayed in new tab
      | TransactionId | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount |
      | 542           | Product Move    | admin | 14/11/2019   | 1     | 14/11/2019    | 200008040151  |