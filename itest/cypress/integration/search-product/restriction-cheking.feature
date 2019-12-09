Feature: Restriction checking

  @focus
  Scenario: Restriction check: wrong contract capable
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:101101101'
    And found customer should have contract capable equals 'N'
    And  found customer should have provisional customer equals 'K'
    And  found customer should have status equals '!'
    And 2 products are displayed
    When add all products
    And error 'Product Move is not allowed for this customer' should be displayed

  @focus
  Scenario: Restriction check: wrong provisional customer
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:101101102'
    And found customer should have contract capable equals 'J'
    And  found customer should have provisional customer equals 'J'
    And  found customer should have status equals 'A'
    And 2 products are displayed
    When add all products
    And error 'Product Move is not allowed for this customer' should be displayed

  @focus
  Scenario: Restriction check: correct data
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:100883236'
    And found customer should have contract capable equals 'J'
    And  found customer should have provisional customer equals ''
    And  found customer should have status equals '!'
    And 2 products are displayed
    When add all products
    And error should not be displayed
