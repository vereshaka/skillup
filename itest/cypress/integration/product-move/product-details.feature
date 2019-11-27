Feature: Product Details

  @focus
  Scenario: Show info about product
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Hybrid Power 150' product from NORM Group
    Then I should see 'A1 Hybrid Power 150' product details
