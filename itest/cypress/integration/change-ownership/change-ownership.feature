Feature: Change Ownership

  @focus
  Scenario: Simple success flow: Order Validation
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108033579'
      | Product  | Subscription     | AccountNumber | AccountType |
      | A1 Kombi | 43/9740/11183504 | A362217278    | PRI         |
    And specify 'A362259643,00001' account founded by 'KDNR:105475536' for 'A362217278 PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product  | Subscription     | AccountNumber | AccountType | LockedOrders |
      | A1 Kombi | 43/9740/11183504 | A362217278    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A362259643,00001 | AT752033100101121960 |              |