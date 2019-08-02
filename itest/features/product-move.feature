Feature: A1 Search Product

  Scenario: User has no permisssion to HFHS Cockpit
    Given As user2 I have login into portal
    Then 'HFHS Cockpit' link is not available

  Scenario: User has permisssion to HFHS Cockpit
    Given As user1 I have login into portal
    Then 'HFHS Cockpit' link is available

  Scenario: Simple success flow
    Given As user1 I have login into portal
    And open 'HFHS Cockpit' cockpit
    And open 'Product Move' widget
    And add all products founded by 'KDNR:100883236'
    And specify 'A604916027,00002' account founded by 'KDNR:103777119' for 'PRI' group
    When 'Order validation' is open
    Then The following source account should be selected
      | Product       | Subscription      | AccountNumber | AccountType | LockedOrders |
      | Mombi_Desiree | 43/9740/201554877 | A548334966    | PRI         |              |
      | Bombi_Desiree | 43/9740/201554878 | A548334966    | PRI         |              |
    And Effective date is '22/7/2019'
    And Target account should be
      | AccountNumber    | IBAN              | LockedOrders                               |
      | A604916029,00001 | AT345345465467456 | OID-31281, OID-63838, OID-38444, OID-43089 |
