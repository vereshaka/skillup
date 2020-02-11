Feature: Product details cos

  @focus
Scenario: Product Details: Show info about product COS
Given As hfhs-user2 with permission 'hfhs-user'
And open 'Change Ownership' widget from 'HFHS Cockpit'
And add all products founded by 'KDNR:108820309'
When I click on 'A1 Internet Pur' COS product with '43/9740/10185187' call number from PRI Group
Then I should see 'A1 Internet Pur' COS with '43/9740/10185187' call number product details
