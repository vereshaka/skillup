Feature: Multiple search
  Scenario: Search by name
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'billa' query
    And selected '109348740' customer and all products
    Then The following products should be selected
      | Product                                | Subscription      | AccountNumber | AccountType | LockedOrders |
      | A1 TV Kombi Plus                       | 43/9740/10428859  | A356569667    | PRI         |              |
      | A1 Internet S                          | 43/9740/11682808  | A368975620    | PRI         |              |
