Feature: Product Move

#  @focus
  Scenario: Simple success flow: Order Validation
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:100883236'
    And specify 'A604916027,00002' account founded by 'KDNR:103777119' for PRI group
    When Order validation step is open
    Then The following source account should be selected
      | Product       | Subscription      | AccountNumber | AccountType | LockedOrders |
      | Mombi_Desiree | 43/9740/201554877 | A548334966    | PRI         |              |
      | Bombi_Desiree | 43/9740/201554878 | A548334966    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN              | LockedOrders |
      | A604916027,00002 | AT165345465467458 |              |

  @focus
  Scenario: Simple success flow
    Given As anonymous user I open GUCCI Portal
    And I have try to login as user2 with correct credential
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    And add all products founded by 'KDNR:100883236'
    And open 'Add Account' dialog
    And specify 'A604916027,00002' account founded by 'KDNR:103777119' for PRI group
    When Order validation step is open
    And Click on Confirm Button
    Then The Product Move Widget will be reset to first page
    And new business transaction will be created
      |DATE|
      |now|
    And business transaction should contains 2 items
      |SOURCE_ACC|TARGET_ACC|
      |...|...|
    And new business transaction detail widget will be open with title "Product Move #<new id>"
