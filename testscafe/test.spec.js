/* global fixture */

import { Selector } from 'testcafe'

/* The fixture will go to the correct website
at the login page you will find all the different users and pw for 
the assigments, Good luck! */
fixture `Lets go to SwagLabs and test`
  .page `https://www.saucedemo.com/`

/* Run it and correect this test */
test.skip('Check the title', async t => {
  await t.expect(Selector('title').innerText).eql('Swag Labs')
});

/* Use the locked_out_user and check if you get a error msg */
test.skip('locked_out_user | Error message', async t =>  {
  await t.typeText("#user-name", "locked_out_user").typeText("#password", "secret_sauce").click("#login-button");

  const errorMsgOjb = Selector("h3").withAttribute("data-test", "error");
  const errorMsg = await errorMsgOjb.innerText;

  await t.expect(errorMsg).eql("Epic sadface: Sorry, this user has been locked out.");
})

/* Login with problem_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout (HINT: test should fail) */
test('problem_user | Login', async t =>  {
  await t
    .typeText("#user-name", "problem_user")
    .typeText("#password", "secret_sauce")
    .click("#login-button")
    .click("#add-to-cart-sauce-labs-onesie")
    .click(".shopping_cart_link")
    .click("#checkout")
    .typeText("#first-name", "John")
    .typeText("#last-name", "Smith")
    .typeText("#postal-code", "11100")
    .click("#continue")
    .click("#finish")
    .click(".shopping_cart_link");

  // await t.expect(Selector(".cart_list")).notContains(".cart_item");       // Warnings (1): You passed a Selector object to 't.expect()

  await t.expect(Selector(".cart_list").innerText).notContains("Sauce Labs Onesie");
  await t.click("#react-burger-menu-btn").click("#logout_sidebar_link");
})

/* Login with standard_user
 change the sorting of products 
 to 'Price (Low to High)'
 verify if its correct */
test.skip('', async t =>  {})

/* Login with standard_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout */
test.skip('', async t =>  {})

/* BONUS 1: Use problem_user and see if all
images render properly. (Hint: test should fail */
test.skip('', async t =>  {})

/* BONUS 2: Use performance_glitch_user
and verify that the website have good performance.
(Hint: set a threshold, test should fail with
performance_glitch_user and it should succeed 
with standard_user */
test.skip('', async t =>  {})
