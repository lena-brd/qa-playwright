Feature: Ecommerce validation
    @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then verify error message is displayed
        Examples:
            | username            | password          |
            | rahulshettyacademy2 | Learning@830$3mK2 |
            | rahulshettyacademy  | Learning@830$3mK3 |