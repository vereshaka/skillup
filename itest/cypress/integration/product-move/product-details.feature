Feature: Product Details

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Kombi' product with '43/2538/85205' call number from NORM Group
    Then I should see 'A1 Kombi' with '43/2538/85205' call number product details

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Kombi' product with '43/2538/85205' call number from NORM Group
    And I click on collapse structure button
    Then Product structure should not be displayed

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Kombi' product with '43/2538/85205' call number from NORM Group
    And I click on collapse structure button
    And I click on expand structure button
    Then Product structure should be displayed
