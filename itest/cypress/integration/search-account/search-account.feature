Feature: Search Account

  @focus
  Scenario: Account Search
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:100883236'
    And open 'Add Account' dialog with 'PRI' group
    And accounts founded by 'KDNR:102338966' are displayed
      | AccountNumber    | IBAN                 |
      | A306248904,00001 | AT443622900000025676 |
      | A358369716,00001 | AT443622900000025676 |
    And I select 'A358369716,00001' account
    When Order validation step is open
    Then Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A358369716,00001 | AT443622900000025676 |              |

  @focus
  Scenario: Account Search - Internet S
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:104659109'
    And open 'Add Account' dialog with 'PRI' group
    And accounts founded by 'KDNR:106452657' are displayed
      | AccountNumber    | IBAN                      |
      | A346764403,00001 | AT342020508701015870      |
      | A363562676,00001 | AT342020508701015870      |
    And I select 'A346764403,00001' account
    When Order validation step is open
    Then Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A346764403,00001 | AT342020508701015870 |              |

  @focus
  Scenario: Account Search - Internet M
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:108109183'
    And open 'Add Account' dialog with 'PRI' group
    And accounts founded by 'KDNR:107624151' are displayed
      | AccountNumber     | IBAN                       |
      | A333106160,00001  | AT943626300002467454       |
      | A333106160,00002  | AT093626300002461127       |
    And I select 'A333106160,00002' account
    When Order validation step is open
    Then Target account should be
      | AccountNumber    | IBAN                       | LockedOrders |
      | A333106160,00002 | AT093626300002461127       |              |