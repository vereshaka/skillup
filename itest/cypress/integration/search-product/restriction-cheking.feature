Feature: Restriction checking

  @focus
  Scenario Outline: Restriction checking
    Given As user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And search products by <query>
    When <flagName> is <value>
    Then error <message> should be displayed

    Examples:
      | query          | flagName | value | message                                       |
      | KDNR:101101101 | Vf       | N     | Product Move is not allowed for this customer |
      | KDNR:101101102 | Pk       | J     | Product Move is not allowed for this customer |
      | KDNR:100883236 | Vf       | J     |                                               |
      | KDNR:100883236 | Pk       |       |                                               |
