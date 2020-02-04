Feature: Business Transaction Details

  @focus
  Scenario: Check details of successfully done transaction
    Given hfhs-user3 has PM business transaction #4 that was 'done' today with items
      | status | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | done   | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as hfhs-user3
    And switch to HFHS Cockpit
    And open 'Business Transaction History' widget from 'HFHS Cockpit'
    And I have selected 'my transactions' that were 'taken place' in the 'last month'
    When I select business transaction #4
    Then business transaction's details are displayed in new tab
      | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount | SourceProductSid                | SourceBillableUser | SourceAccount | Order   |
      | Product Move    | user3 | today        | 1     | today         | A604916029    | BPO_A1_HYBRID_POWER_150_40_2016 | null               | A548334910    | CO99571 |

  @focus
  Scenario: Check details of transaction done with error
    Given hfhs-user3 has PM business transaction #5 that was 'done with error' today with items
      | status     | source_party_id | source_acc_id | source_product_sidid              | target_party_id | target_acc_id | order_id  | error | source_product_id | source_acc_type | source_phone_cc | source_phone_ndc | source_phone_sn | source_billable_user |
      | with_error | 103777118       | 'A548334910'  | 'BPO_A1_HYBRID_POWER_150_40_2016' | 103777119       | 'A604916029'  | 'CO99571' | 'OK'  | 21603159          | 'NORM'          | 43              | 9740             | 201554877       | null                 |
    And I open GUCCI Portal as hfhs-user3
    And switch to HFHS Cockpit
    And open 'Business Transaction History' widget from 'HFHS Cockpit'
    And I have selected 'my transactions' that were 'taken place' in the 'last month'
    When I select business transaction #5
    Then business transaction's details are displayed in new tab
      | TransactionType | User  | CreationDate | Count | EffectiveDate | TargetAccount | SourceProductSid                | SourceBillableUser | SourceAccount |
      | Product Move    | user3 | today        | 1     | today         | A604916029    | BPO_A1_HYBRID_POWER_150_40_2016 | null               | A548334910    |

