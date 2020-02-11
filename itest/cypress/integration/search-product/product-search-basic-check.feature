Feature: Product search basic check

  @focus
  Scenario:  Search by Account (Maxbill)
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'ACC: 200007508329' query
    And selected all products
    Then The following products should be selected
      | Product                                    | Subscription      | AccountNumber | AccountType | LockedOrders |
      |A1 Festnetz Standard                        | 43/463/219377     | 200007508329     | NORM     |              |

  @focus
  Scenario:  Search by Account - Search by Call Number
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by '43/463/740168' query
    And selected all products
    Then The following products should be selected
      | Product                                    | Subscription      | AccountNumber    | AccountType | LockedOrders |
      |A1 Festnetz                                 | 43/463/740168     | 200007376176      | NORM       |              |

  @focus
  Scenario:  Search by Account - Search by Club Register Number
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'ZVR: 129239566' query
    And selected all products
    Then The following products should be selected
      | Product                                    | Subscription      | AccountNumber      | AccountType | LockedOrders |
      |A1 Kombi                                    | 43/7412/53047     | 200008614534       | NORM        |              |

  @focus
  Scenario:  Search by Account - Search by Company Register Number
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'FBNR:00283866a' query


  @focus
  Scenario:  Search by Account - Search by Street Name and House Number and Post Code
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'SN:Hirtenweg&& HN:2&&7062' query
    And selected '104193326' customer and all products
    Then The following products should be selected
      | Product                                    | Subscription        | AccountNumber      | AccountType | LockedOrders |
      |A1 Internet XS                              | 43/9740/11252161    | A363293670         | PRI         |              |

  @focus
  Scenario:  Search by Account -  Location ID
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'LOK:27399781' query
    And selected '103068841' customer and all products
    Then The following products should be selected
      | Product                                      | Subscription        | AccountNumber      | AccountType | LockedOrders |
      |A1 Kombi                                    | 43/9740/10921666       | A358569796         | PRI         |              |
      |A1 TV Kombi S                                   | 43/9740/10921639      | A358565167          | PRI         |              |


  @focus
  Scenario:  Search by Account -  Subscription ID
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'SUB:3034825' query
    And selected all products
    Then The following products should be selected
      | Product                                              | Subscription      | AccountNumber      | AccountType | LockedOrders |
      |A1 Festnetz-Internet                                  | 43/9740/10311181  | A351423866        | PRI        |              |


  @focus
  Scenario:  Search by Account -  Search by Technical Subscription
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'TSUB:6N37KwOXRSuawHczA6LQ0w&&TSTYPE:VIVA' query
    And selected all products
    Then The following products should be selected
      | Product                                              | Subscription      | AccountNumber      | AccountType | LockedOrders |
      |A1 Smart Home                                          |  BVK.71   | A361812131         | PRI        |              |


  @focus
  Scenario:  Search by Account -  Search by Technical Subscription
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'BU: BVK.71' query
    And selected all products
    Then The following products should be selected
      | Product                                              | Subscription      | AccountNumber      | AccountType | LockedOrders |
      |A1 Smart Home                                          |  BVK.71   | A361812131         | PRI        |              |