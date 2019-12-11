Feature: Product Details

  @focus
  Scenario: Show info about product
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:101333395'
    When I click on 'A1 Domain Service' product from NORM Group
    Then I should see 'A1 Domain Service' product details
