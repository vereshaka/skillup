Feature: Change Ownership not allowed


  @focus
  Scenario: Simple success flow: Order Validation -A1 Business Kombi
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:102384192'
      | Product            | Subscription      |
      | A1 Business Kombi  |  43/9740/11585967 |
    And open 'Add Account' dialog with 'NORM' group
    When I try to search by 'KDNR:105475536' query
    Then 'No accounts were found' COS should be displayed


  @focus
  Scenario: Simple success flow: Order Validation -PRI to SNW
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:105536478'
      | Product                          | Subscription         |
      | A1 Internet S                    |   43/9740/11117228   |
    And open 'Add Account' dialog with 'PRI' group
    When I try to search by 'KDNR:108894694' query
    Then 'No accounts were found' should be displayed

  @focus
  Scenario: Simple success flow: Order Validation -PRI to MTA
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Change Ownership' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:105536478'
      | Product                          | Subscription         |
      | A1 Internet S                    |   43/9740/11117228   |
    And open 'Add Account' dialog with 'PRI' group
    When I try to search by 'KDNR:100242925' query
    Then 'No accounts were found' should be displayed
