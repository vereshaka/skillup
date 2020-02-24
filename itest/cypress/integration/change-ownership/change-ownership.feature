Feature: Change Ownership

  @focus
  Scenario: Simple success flow: Order Validation - customer communication
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
    And Effective date is '21.02.2020'
    And Transaction fee discount is '50% discount'
    And Transaction customer communication is 'New customer'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A362259643,00001 | AT752033100101121960 |              |

  @focus
  Scenario: Simple success flow: Order Validation - customer communication
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
    And Effective date is '21.02.2020'
    And Transaction fee discount is '50% discount'
    And Transaction customer communication is 'New and Previous customer'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A362259643,00001 | AT752033100101121960 |              |

  @focus
  Scenario: Simple success flow: Order Validation - customer communication
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
    And Effective date is '21.02.2020'
    And Transaction fee discount is '50% discount'
    And Transaction customer communication is 'Previous customer'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A362259643,00001 | AT752033100101121960 |              |

  @focus
  Scenario: Simple success flow: Order Validation - customer communication
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
    And Effective date is '21.02.2020'
    And Transaction fee discount is '50% discount'
    And Transaction customer communication is 'Suppress customer letters'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A362259643,00001 | AT752033100101121960 |              |

  @focus
  Scenario: Transaction fee calculation
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108033579'
      | Product  | Subscription     | AccountNumber | AccountType |
      | A1 Kombi | 43/9740/11183504 | A362217278    | PRI         |
    And specify 'A362259643,00001' account founded by 'KDNR:105475536' for 'A362217278 PRI' group
    When Order validation step is open
    And Transaction fee discount is '50% discount'
    Then Transaction fee should be '23.50'

  @focus
  Scenario: Transaction fee calculation
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108033579'
      | Product  | Subscription     | AccountNumber | AccountType |
      | A1 Kombi | 43/9740/11183504 | A362217278    | PRI         |
    And specify 'A362259643,00001' account founded by 'KDNR:105475536' for 'A362217278 PRI' group
    When Order validation step is open
    And Transaction fee discount is 'no discount'
    Then Transaction fee should be '47.00'

  @focus
  Scenario: Transaction fee calculation
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108033579'
      | Product  | Subscription     | AccountNumber | AccountType |
      | A1 Kombi | 43/9740/11183504 | A362217278    | PRI         |
    And specify 'A362259643,00001' account founded by 'KDNR:105475536' for 'A362217278 PRI' group
    When Order validation step is open
    And Transaction fee discount is '100% discount'
    Then Transaction fee should be '0.00'

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


  @focus
  Scenario: Check Legal Representative info
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    When I search products by 'KDNR:103670419'
    Then Legal Representative info should be displayed
      | Type       | KDNR      |
      | Sachwalter | 109385719 |
