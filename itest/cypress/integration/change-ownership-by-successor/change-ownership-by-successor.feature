Feature: Change Ownership by successor

  @focus
  Scenario: Simple success flow: Order Validation
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership by successor' widget from 'HFHS Cockpit'
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
  Scenario: Transaction fee calculation
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership by successor' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108033579'
      | Product  | Subscription     | AccountNumber | AccountType |
      | A1 Kombi | 43/9740/11183504 | A362217278    | PRI         |
    And specify 'A362259643,00001' account founded by 'KDNR:105475536' for 'A362217278 PRI' group
    When Order validation step is open
    And Transaction fee discount is '50% discount'
    Then Transaction fee should be '10.00'

  @focus
  Scenario: Check Legal Representative info
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership by successor' widget from 'HFHS Cockpit'
    When I search products by 'KDNR:103670419'
    Then Legal Representative info should be displayed
      | Type       | KDNR      |
      | Sachwalter | 109385719 |

  @focus
  Scenario: Check Transferability: transferable
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership by successor' widget from 'HFHS Cockpit'
    When I add products founded by 'KDNR:108033579'
      | Product  | Subscription     | AccountNumber | AccountType |
      | A1 Kombi | 43/9740/11183504 | A362217278    | PRI         |
    Then I should see that product 'transferable'
    And Select account button 'active'

  Scenario: Check Transferability: not transferable
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership by successor' widget from 'HFHS Cockpit'
    When I add products founded by 'ACC:200008146444'
      | Product    | Subscription    | AccountNumber | AccountType |
      | TUS Legacy | 43/9732/1008001 | 200008146444  | NORM        |
    Then I should see that product 'not transferable'
    And Select account button 'disabled'

  @focus
  Scenario: Check date
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership by successor' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:102849412'
      | Product  | Subscription     | AccountNumber | AccountType |
      | A1 Mobil Start | 43/9143/00557 | 200002376215    | NORM         |
    And specify '200003507657' account founded by 'KDNR:102567907' for '200002376215 NORM' group
    When Order validation step is open
    And set effective date not end of month
    Then Execution Date warning should exist

  @focus
  Scenario: Delete product
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Change Ownership by successor' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100883236'
      | Product  | Subscription     |
      | A1 Kombi | 43/9740/10935673 |
    When I delete products
      | Product  | Subscription     |
      | A1 Kombi | 43/9740/10935673 |
    Then I should see Product Selection step
