Feature: Product Details

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Hybrid Power 150' product with '43/9740/201554877' call number from NORM Group
    Then I should see 'A1 Hybrid Power 150' with '43/9740/201554877' call number product details

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Hybrid Power 150' product with '43/9740/201554877' call number from NORM Group
    And I click on collapse structure button
    Then Product structure should not be displayed

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Hybrid Power 150' product with '43/9740/201554877' call number from NORM Group
    And I click on collapse structure button
    And I click on expand structure button
    Then Product structure should be displayed

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Hybrid Power 150' product with '43/9740/201554877' call number from NORM Group
    And type 'Breitband' at search field
    Then 3 products should be highlighted
      | ProductName                           | SidID                              |
      | A1 Breitband Pro Business symmetrisch | BPO_BREITBAND_PRO_BUSINESS_SYM     |
      | Breitband Internet Pro Bus Sym        | POG_BREITBAND_INTERNET_PRO_BUS_SYM |
      | A1 Breitband Pro 8/8 Business         | SPO_BREITBAND_PRO_8_8_BUSINESS     |

  @focus
  Scenario: Show info about product
    Given As admin with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:103777118'
    When I click on 'A1 Hybrid Power 150' product with '43/9740/201554877' call number from NORM Group
    And click on 'A1 Breitband Pro Business symmetrisch' subproduct
    Then Price info should be presented
      | Name                                 | Value                                                  | Frequency | BasePrice | Price  | TaxRate |
      | Monatliches Entgelt A1 Breitband Pro | POP_RC_A1_BREITBAND_PRO_BUSINESS_SYM_EUR_199_00_LEGACY | Monthly   | 199EUR    | 199EUR | 20      |
    And Characteristic info should be presented
      | NamePSC                | NamePSCV                | ValidFor         | Value     |
      | PSC_AON_ACCOUNT_NUMBER | PSCV_AON_ACCOUNT_NUMBER | 28/03/2012 - ... | 913608553 |
