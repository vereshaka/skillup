Feature: Multiple search
  Scenario: Search by name
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'billa' query
    And selected 'Billavdet Ulrike' customer and all products
    Then The following products should be selected
      | Product                                | Subscription      | AccountNumber | AccountType | LockedOrders |
      | A1 Breitband Pro Business asymmetrisch | 43/9740/201554876 | A548334909    | PRI         |              |
      | A1 Bombi                               | 43/9740/201554878 | A548334911    | PRI         |              |
