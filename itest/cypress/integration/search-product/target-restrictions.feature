Feature: Target restrictions

  @focus
  Scenario: CASE #0: Check of allowed Provisional Status of Target Party
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by '43/6562/4247'
      | Product                            | Subscription |
      | Alte ISDN Produkte, ohne Breitband | 43/6562/4247 |
    And specify '200000097968' account founded by 'KDNR:100242925' for 'NORM' group
    Then Order validation step is open
    Then The following source account should be selected
      | Product                            | Subscription | AccountNumber | AccountType | LockedOrders |
      | Alte ISDN Produkte, ohne Breitband | 43/6562/4247 | 200003832891  | NORM        |              |


  @focus
  Scenario: CASE #1: Check of forbidden Provisional Status of Target Party User with common permissions
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by '43/6562/4247'
      | Product                            | Subscription |
      | Alte ISDN Produkte, ohne Breitband | 43/6562/4247 |
    When specify '200010356372' account founded by 'KDNR:109720116' for 'NORM' group
    Then Order validation step is not open
    And  I see warning icon

  @focus
  Scenario: CASE #2: Check of forbidden Provisional Status of Target Party User with Superuser permissions
    Given I open GUCCI Portal as hfhs-user3
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by '43/6562/4247'
      | Product                            | Subscription |
      | Alte ISDN Produkte, ohne Breitband | 43/6562/4247 |
    And specify '200010356372' account founded by 'KDNR:109720116' for 'NORM' group
    When Order validation step is open
    Then The following source account should be selected
      | Product                            | Subscription | AccountNumber | AccountType | LockedOrders |
      | Alte ISDN Produkte, ohne Breitband | 43/6562/4247 | 200003832891  | NORM        |              |

