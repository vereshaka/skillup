Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100883236'
      | Product  | Subscription     |
      | A1 Kombi | 43/9740/10935673 |
    And specify 'A306248904,00001' account founded by 'KDNR:102338966' for 'PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product  | Subscription     | AccountNumber | AccountType | LockedOrders |
      | A1 Kombi | 43/9740/10935673 | A358765465    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A306248904,00001 | AT443622900000025676 |              |

  @focus
  Scenario: Adding products into filled group
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100668958'
      | Product                                | Subscription  |
      | A1 Breitband Pro Business asymmetrisch | 43/2234/79160 |
    And I specify '200010665207' account founded by 'KDNR:106525742' for 'NORM' group
    When I add another product founded by 'KDNR:106525742'
      | Product                              | Subscription     |
      | A1 Festnetz-Internet Business Aktion | 43/9740/11604955 |
    Then The following products should be selected
      | Product                                | Subscription     | AccountNumber | AccountType | LockedOrders |
      | A1 Breitband Pro Business asymmetrisch | 43/2234/79160    | 200000532086  | NORM        |              |
      | A1 Festnetz-Internet Business Aktion   | 43/9740/11604955 | 200010665209  | NORM        |              |
    And Target account should not be selected
    And 'Add Account' button should be active
