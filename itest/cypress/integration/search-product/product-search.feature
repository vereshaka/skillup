Feature: Multiple search

  @focus
  Scenario: Search by name
    Given I open GUCCI Portal as hfhs-user2
    And open 'Product Move' widget from 'HFHS Cockpit'
    And open 'Add Product' dialog
    When I try to search by 'billa' query
    And selected '109348642' customer and all products
    Then The following products should be selected
      | Product         | Subscription     | AccountNumber | AccountType | LockedOrders |
      | A1 Internet Pur | 43/9740/10767064 | A356569281    | PRI         |              |
