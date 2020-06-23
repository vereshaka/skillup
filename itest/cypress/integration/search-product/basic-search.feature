Feature: Basic Search

  @focus
  Scenario: Search by Party Number
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'KDNR:100200108'
    Then I should see following 'products'
      | Product     | Subscription | AccountNumber | AccountType |
      | A1 Festnetz ISDN  | 43/2272/65400 | 200006294697  | NORM        |
      | A1 Festnetz | 43/2622/26633 | 200006294697   | NORM        |

  @focus
  Scenario: Search by Account(Maxbill)
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'ACC:200007508329'
    Then I should see following 'products'
      | Product              | Subscription  | AccountNumber | AccountType |
      | A1 Festnetz Standard | 43/463/219377 | 200007508329  | NORM        |

  @focus
  Scenario: Search by Account(Amdocs)
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'ACC:A356297873,00001'
    Then I should see following 'products'
      | Product        | Subscription     | AccountNumber | AccountType |
      | A1 Internet XS | 43/9740/10748716 | A356297873    | VER         |

  @focus
  Scenario: Search by Call Number
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by '43/463/740168'
    Then I should see following 'products'
      | Product     | Subscription  | AccountNumber | AccountType |
      | A1 Festnetz | 43/463/740168 | 200007376176  | NORM        |

  @focus
  Scenario: Search by Club Register Number
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'ZVR:129239566'
    Then I should see following 'products'
      | Product  | Subscription  | AccountNumber | AccountType |
      | A1 Kombi | 43/7412/53047 | 200008614534  | NORM        |

  @focus
  Scenario: Search by Street Name and House Number and Post Code
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'SN:Hirtenweg && HN:2&&7062'
    Then I should see following 'parties'
      | PartyName         | PartyNumber | Address          |
      | Maurer Arbnora    | 104193326   | 7062 Hirtenweg 2 |
      | Matzer Doranal    | 104200016   | 7062 Hirtenweg 2 |
      | Schranz Donatilla | 102286777   | 7062 Hirtenweg 2 |

  @focus
  Scenario: Search by Location
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'LOK:27399781'
    Then I should see following 'parties'
      | PartyName                | PartyNumber | Address             |
      | Rabatsch Fisia           | 103068841   | 1070 Kirchengasse 7 |
      | Firma TBEU556888341 Gmbh | 109637467   | 1070 Kirchengasse 7 |

  @focus
  Scenario: Search by Product Name
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'PN:A1 Festnetz && KDNR:100200108'
    Then I should see following 'products'
      | Product     | Subscription  | AccountNumber | AccountType |
      | A1 Festnetz | 43/2622/26633  | 200006294697   | NORM        |


  @focus
  Scenario: Search by Subscription ID
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'SUB:3034825'
    Then I should see following 'products'
      | Product              | Subscription     | AccountNumber | AccountType |
      | A1 Festnetz-Internet | 43/9740/10311181 | A351423866    | PRI         |

  @focus
  Scenario: Search by Technical Subscription
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'TSUB:6N37KwOXRSuawHczA6LQ0w && TSTYPE:VIVA'
    Then I should see following 'products'
      | Product       | Subscription | AccountNumber | AccountType |
      | A1 Smart Home | BVK.71       | A361812131    | PRI         |

  @focus
  Scenario: Search by Billable User
    Given As hfhs-user2 with permission 'hfhs-user'
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I search by 'BU:BVK.71'
    Then I should see following 'products'
      | Product       | Subscription | AccountNumber | AccountType |
      | A1 Smart Home | BVK.71       | A361812131    | PRI         |
