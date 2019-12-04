Feature: Business Transaction Details

  @focus
  Scenario: Check details of successfully done transaction
    Given user3 has business transaction #2 that was 'done' today with items
      | business_transaction_item_id | status | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | 2                            | done   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And I have selected 'my transactions' that were 'taken place' in the 'last month'
    When I select business transaction #2
    Then business transaction's details are displayed in new tab
      | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount | SourceProductSid                | SourceBillableUser | SourceAccount | Order   |
      | Product Move    | user3 | today        | 1     | today         | A604916029    | BPO_A1_HYBRID_POWER_150_40_2016 | null               | A548334910    | CO99571 |

  @focus
  Scenario: Check details of transaction done with error
    Given user3 has business transaction #3 that was 'done with error' today with items
      | business_transaction_item_id | status       | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | 3                            | with_error   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as user3
    And switch to HFHS Cockpit
    And I have selected 'my transactions' that were 'taken place' in the 'last month'
    When I select business transaction #3
    Then business transaction's details are displayed in new tab
      | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount | SourceProductSid                | SourceBillableUser | SourceAccount |
      | Product Move    | user3 | today        | 1     | today         | A604916029    | BPO_A1_HYBRID_POWER_150_40_2016 | null               | A548334910    |

