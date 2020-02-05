Feature: Restriction checking

  @focus
  Scenario: Restriction check: wrong contract capable - Test 1 - Vf: N 
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:110041125'
    And found customer should have contract capable equals 'N'
    And  found customer should have provisional customer equals ''
    And  found customer should have status equals '!'
    And 1 products are displayed
    When add all products
    And error 'Product Move is not allowed for this customer' should be displayed

     @focus
  Scenario: Restriction check: wrong contract capable - Test 2-  Vf: N 
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:110043604'
    And found customer should have contract capable equals 'N'
    And  found customer should have provisional customer equals ''
    And  found customer should have status equals '!'
    And 1 products are displayed
    When add all products
    And error 'Product Move is not allowed for this customer' should be displayed

  @focus
  Scenario: Restriction check: wrong provisional customer - Test:  Pk: J
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:109473850'
    And found customer should have contract capable equals 'J'
    And  found customer should have provisional customer equals 'J'
    And  found customer should have status equals 'A'
    And 1 products are displayed
    When add all products
    And error 'Product Move is not allowed for this customer' should be displayed

      @focus
  Scenario: Restriction check: wrong provisional customer - Test:  Pk: D	
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:109930460'
    And found customer should have contract capable equals 'J'
    And  found customer should have provisional customer equals 'D'
    And  found customer should have status equals 'A'
    And 1 products are displayed
    When add all products
    And error 'Product Move is not allowed for this customer' should be displayed

        @focus
  Scenario: Restriction check: wrong provisional customer - Test:  Vf: N Pk: A	
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:109493076'
    And found customer should have contract capable equals 'N'
    And  found customer should have provisional customer equals 'A'
    And  found customer should have status equals 'A'
    And 1 products are displayed
    When add all products
    And error 'Product Move is not allowed for this customer' should be displayed


  @focus
  Scenario: Restriction check: correct data
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:108033579'
    And found customer should have contract capable equals 'J'
    And  found customer should have provisional customer equals ''
    And  found customer should have status equals '!'
    And 1 products are displayed
    When add all products
    And error should not be displayed
