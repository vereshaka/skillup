Feature: Product Details

  @focus
  Scenario: Show info about product
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:108033579'
    When I click on 'A1 Kombi' product with '43/9740/11183504' call number from PRI Group
    Then I should see 'A1 Kombi' with '43/9740/11183504' call number product details


  #@focus
  #Scenario: Show info about product - Change Ownership
   # Given As hfhs-user2 with permission 'hfhs-user'
    #And open 'Change Ownership' widget from 'HFHS Cockpit'
    #And add all products founded by 'KDNR:108033579'
    #When I click on 'A1 Kombi' COS product with '43/9740/11183504' call number from PRI Group
    #Then I should see 'A1 Kombi' with '43/9740/11183504' call number product details


  @focus
  Scenario: Collapse product structure
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:108033579'
    When I click on 'A1 Kombi' product with '43/9740/11183504' call number from PRI Group
    And I click on collapse structure button
    Then Product structure should not be displayed

  @focus
  Scenario: Collapse and expand product structure
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:108033579'
    When I click on 'A1 Kombi' product with '43/9740/11183504' call number from PRI Group
    And I click on collapse structure button
    And I click on expand structure button
    Then Product structure should be displayed

  @focus
  Scenario: Search subproducts
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:108033579'
    When I click on 'A1 Kombi' product with '43/9740/11183504' call number from PRI Group
    And type 'Festnetz' at search field
    Then 4 products should be highlighted
      | ProductName                | SidID                                   |
      | A1 Festnetz                | BPO_A1_FESTNETZ_COMPONENT_2013          |
      | A1 Festnetz-Internet       | BPO_A1_FESTNETZ_INTERNET_COMPONENT_2013 |
      | A1 Festnetz-Internet       | POG_BREITBAND_INTERNET                  |
      | A1 Internet Festnetz Power | SPO_A1_FESTNETZ_INTERNET_80_2018        |

  @focus
  Scenario: Check subproduct info
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add all products founded by 'KDNR:108033579'
    When I click on 'A1 Kombi' product with '43/9740/11183504' call number from PRI Group
    And click on 'A1 Online-Festplatte 1GB' subproduct
    Then Price info should be presented
      | Name                                         | Value                           | Frequency | BasePrice | Price | TaxRate |
      | Monatliches Entgelt A1 Online-Festplatte 1GB | POP_RC_A1_ONLINE_FESTPLATTE_1GB | Monthly   | 0EUR      | 0EUR  | 20      |
    And Characteristic info should be presented
      | Name                       | SidId                               | SidIdPSCV                                | Value |
      | Online-Speicherplatz       | PSC_ONLINE_FREE_SPACE               | PSCV_OFS_1024MB                          | 1024  |
      | Speicherkapazität Standard | PSC_ONLINE_FESTPLATTE_STANDARD_SIZE | PSCV_ONLINE_FESTPLATTE_STANDARD_SIZE_1GB | 1024  |
