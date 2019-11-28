Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by 'KDNR:100883236'
