Feature: Sanity Tests

  @focus
  Scenario: Check Product Move widget
    Given I open GUCCI Portal as hfhs-user2
    When switch to HFHS Cockpit
    And I open 'Product Move' Widget from toolbar
    Then 'Product Move' widget should exist
    And Search Product works

  @focus
  Scenario: Check Change Ownership widget
    Given I open GUCCI Portal as hfhs-user2
    When switch to HFHS Cockpit
    And I open 'Change Ownership' Widget from toolbar
    Then 'Change Ownership' widget should exist

  @focus
  Scenario: Check Business Transaction History widget
    Given I open GUCCI Portal as hfhs-user2
    When switch to HFHS Cockpit
    And I open 'Business Transaction History' Widget from toolbar
    Then 'Business Transaction History' widget should exist

  @focus
  Scenario: Product Move: Simple success flow
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108820309'
      | Product         | Subscription     |
      | A1 Internet Pur | 43/9740/10185187 |
    And specify 'A331804321,00001' account founded by 'KDNR:107564392' for 'PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product         | Subscription     | AccountNumber | AccountType | LockedOrders |
      | A1 Internet Pur | 43/9740/10185187 | A349200817    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A331804321,00001 | AT233306500000315705 |              |

  @focus
  Scenario: Change Ownership: Simple success flow
    Given I open GUCCI Portal as hfhs-user2
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108820309'
      | Product         | Subscription     | AccountNumber | AccountType |
      | A1 Internet Pur | 43/9740/10185187 | A349200817    | PRI         |
    And specify 'A331804321,00001' account founded by 'KDNR:107564392' for 'A349200817 PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product         | Subscription     | AccountNumber | AccountType | LockedOrders |
      | A1 Internet Pur | 43/9740/10185187 | A349200817    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A331804321,00001 | AT233306500000315705 |              |

  @focus
  Scenario: Product Details: Show info about product
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:108820309'
    When I click on 'A1 Internet Pur' product with '43/9740/10185187' call number from PRI Group
    Then I should see 'A1 Internet Pur' with '43/9740/10185187' call number product details

  @focus
  Scenario: Business transaction details
    Given I open GUCCI Portal as hfhs-user3
    And open 'Business Transaction History' widget from 'HFHS Cockpit'
    And business transaction history widget is displayed
    And transaction list mode group is presented
    And I have selected 'all transactions' that were 'taken place' in the 'last month'
    When I open first operation from list
    Then Business transaction details widget should exist

