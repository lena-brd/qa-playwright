Feature: Ecommerce validation
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application
        When adding "ZARA COAT 3" to cart
        Then verify "ZARA COAT 3" is displayed in the cart
        When enter valid details and place an order
            | cardNumber          | expiryMonth | expiryYear | cvv | name     | country | countryName    |
            | 4542 9931 9292 2293 | 02          | 17         | 111 | John Doe | Cze     | Czech Republic |
        Then verify that order is present in order history