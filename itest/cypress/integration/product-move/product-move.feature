Feature: Product Move

  @focus
  Scenario: Simple success flow: Order Validation
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100883236'
      | Product  | Subscription     |
      | A1 Kombi | 43/9740/10935673 |
    And specify 'A306248904,00001' account founded by 'KDNR:102338966' for 'PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product  | Subscription     | AccountNumber | AccountType | LockedOrders |
      | A1 Kombi | 43/9740/10935673 | A358765465    | PRI         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN                 | LockedOrders |
      | A306248904,00001 | AT443622900000025676 |              |

  @focus
  Scenario: Adding products into filled group
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100668958'
      | Product                                | Subscription  |
      | A1 Breitband Pro Business asymmetrisch | 43/2234/79160 |
    And I specify '200004228703' account founded by 'KDNR:100134526' for 'NORM' group
    When I add another product founded by 'KDNR:100134526'
      | Product                            | Subscription |
      | Alte ISDN Produkte, ohne Breitband | 43/1/7692711 |
    Then The following products should be selected
      | Product                                | Subscription  | AccountNumber | AccountType | LockedOrders |
      | A1 Breitband Pro Business asymmetrisch | 43/2234/79160 | 200000532086  | NORM        |              |
      | Alte ISDN Produkte, ohne Breitband     | 43/463/33233  | 200004485264  | NORM        |              |
    And Target account should not be selected
    And 'Add Account' button should be active

  @focus
  Scenario: Check Previous and Next combination
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100883236'
      | Product  | Subscription     |
      | A1 Kombi | 43/9740/10935673 |
    And specify 'A306248904,00001' account founded by 'KDNR:102338966' for 'PRI' group
    When Order validation step is open
    And click 'Previous Button'
    And click 'Next Button'
    Then 'Product Move' widget should exist

  @focus
  Scenario: Simple success flow: Order Validation -A1 Business Kombi
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:102384192'
      | Product            | Subscription      |
      | A1 Business Kombi  |  43/9740/11585967 |
    And specify '200010017140' account founded by 'KDNR:109474694' for 'NORM' group
    When Order validation step is open
    Then The following source account should be selected
      | Product           | Subscription      | AccountNumber   | AccountType  | LockedOrders |
      | A1 Business Kombi | 43/9740/11585967  | 200002130173    | NORM         |              |
    And Effective date is 'now'
    And Target account should be
      | AccountNumber    | IBAN              | LockedOrders |
      | 200010017140     |                   |              |


  @focus
  Scenario: Simple success flow: Order Validation -A1 Kombi
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108033579'
      | Product            | Subscription      |
      | A1 Kombi           |  43/9740/11183504 |
    And specify 'A362259643,00001' account founded by 'KDNR:105475536' for 'PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product           | Subscription       | AccountNumber       | AccountType     | LockedOrders |
      | A1 Kombi          | 43/9740/11183504   | A362217278          | PRI         |              |

    And Effective date is 'now'
    And Target account should be
      | AccountNumber        | IBAN                                  | LockedOrders |
      | A362259643,00001     | AT752033100101121960                  |              |


  @focus
  Scenario: Simple success flow: Order Validation -Internet S
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:104659109'
      | Product               | Subscription      |
      | A1 Internet S         |  43/9740/11188000 |
    And specify 'A346764403,00001' account founded by 'KDNR:106452657' for 'PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product           | Subscription       | AccountNumber       | AccountType     | LockedOrders |
      | A1 Internet S     | 43/9740/11188000   | A362292224          | PRI             |              |

    And Effective date is 'now'
    And Target account should be
      | AccountNumber        | IBAN                                  | LockedOrders |
      | A346764403,00001     | AT342020508701015870                  |              |



  @focus
  Scenario: Simple success flow: Order Validation - A1 SIP Trunk Premium 15
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100209315'
      | Product                       | Subscription       |
      | A1 SIP Trunk Premium 15       |   43/9740/11538237 |
    And specify '200000097968' account founded by 'KDNR:100242925' for 'NORM' group
    When Order validation step is open
    Then The following source account should be selected
      | Product                    | Subscription        | AccountNumber       | AccountType     | LockedOrders |
      | A1 MPLS Access Business    |  43/9740/11431692   | 200007730806           | NORM             |              |

    And Effective date is 'now'
    And Target account should be
      | AccountNumber        | IBAN                       | LockedOrders |
      | 200007730806         |                           |              |



  @focus
  Scenario: Simple success flow: Order Validation -Internet M
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:108109183'
      | Product               | Subscription      |
      | A1 Internet M         |  43/9740/10824678 |
    And specify 'A346764403,00001' account founded by 'KDNR:106452657' for 'PRI' group
    When Order validation step is open
    Then The following source account should be selected
      | Product           | Subscription       | AccountNumber       | AccountType     | LockedOrders |
      | A1 Internet M     | 43/9740/10824678   | A357355207          | PRI             |              |

    And Effective date is 'now'
    And Target account should be
      | AccountNumber        | IBAN                                  | LockedOrders |
      | A346764403,00001     | AT342020508701015870                  |              |


  @focus
  Scenario: Simple success flow: Order Validation -Business Internet 150
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:109341260'
      | Product                   | Subscription      |
      | A1 Business Internet 150     |  43/9740/11653247 |
    And specify '200007337896' account founded by 'KDNR:100124493' for 'NORM' group
    When Order validation step is open
    Then The following source account should be selected
      | Product                     | Subscription       | AccountNumber       | AccountType     | LockedOrders |
      | A1 Business Internet 150    | 43/9740/11653247   | 200009828827        | NORM            |              |

    And Effective date is 'now'
    And Target account should be
      | AccountNumber        | IBAN                      | LockedOrders |
      | 200007337896         |                           |              |



  @focus
  Scenario: Adding products into filled group
    Given I open GUCCI Portal as hfhs-user3
    And open 'Product Move' widget from 'HFHS Cockpit'
    And add products founded by 'KDNR:100668958'
      | Product                            | Subscription  |
      | Alte ISDN Produkte, ohne Breitband | 43/2234/72286 |
    And I specify '200004066276' account founded by 'KDNR:100100100' for 'NORM' group
    When I add another product founded by 'KDNR:100100100'
      | Product           | Subscription     |
      | A1 Business Internet 20 Aktion          | 43/9740/11622299 |
    Then The following products should be selected
      | Product                            | Subscription  | AccountNumber | AccountType | LockedOrders |
      | Alte ISDN Produkte, ohne Breitband | 43/9740/10429317 | 200000532086  | NORM        |              |
      |A1 Business Internet 20 Aktion                      | 43/9740/11622299 | 200010696132   | NORM        |              |
    And Target account should not be selected
    And 'Add Account' button should be active

