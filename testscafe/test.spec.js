/* global fixture */

/* PLEASE INSTALL NEW DEPENDENCIES USING NPM INSTALL */

import { ClientFunction, Selector } from "testcafe";
import { getPerformanceMetrics } from "@platform-os/testcafe-helpers";

/* The fixture will go to the correct website
at the login page you will find all the different users and pw for 
the assigments, Good luck! */
fixture`Lets go to SwagLabs and test`.page`https://www.saucedemo.com/`;

/* Run it and correect this test */
test("Check the title", async (t) => {
  await t.expect(Selector("title").innerText).eql("Swag Labs");
});

/* Use the locked_out_user and check if you get a error msg */
test("locked_out_user | Error message", async (t) => {
  await t.typeText("#user-name", "locked_out_user").typeText("#password", "secret_sauce").click("#login-button");

  const errorMsgOjb = Selector("h3").withAttribute("data-test", "error");
  const errorMsg = await errorMsgOjb.innerText;

  await t.expect(errorMsg).eql("Epic sadface: Sorry, this user has been locked out.");
});

/* Login with problem_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout (HINT: test should fail) */
test("problem_user | Login", async (t) => {
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
});

/* Login with standard_user
 change the sorting of products 
 to 'Price (Low to High)'
 verify if its correct */
test("standard_user | Sorting of products", async (t) => {
  await t.typeText("#user-name", "standard_user").typeText("#password", "secret_sauce").click("#login-button").click(".product_sort_container");

  const lowToHighSorter = Selector(".product_sort_container").child(2);
  await t.click(lowToHighSorter);
  const priceSelector = Selector(".inventory_item_price");
  const counter = await priceSelector.count;

  let priceArr = [];

  for (let i = 0; i < counter; i++) {
    let arrElement = await priceSelector.nth(i).innerText;
    priceArr.push(+arrElement.substring(1));
  }

  let sortingResult = true;

  priceArr.forEach((el, i, arr) => {
    if (el > arr[i + 1]) {
      sortingResult = false;
    }
  });

  await t.expect(sortingResult).eql(true);
});

/* Login with standard_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout */
test("standard_user | Login", async (t) => {
  await t
    .typeText("#user-name", "standard_user")
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
});

/* BONUS 1: Use problem_user and see if all
images render properly. (Hint: test should fail */
test("problem_user | Images rendering", async (t) => {
  await t.typeText("#user-name", "problem_user").typeText("#password", "secret_sauce").click("#login-button");

  const checkCorrectImg = ClientFunction(() => {
    const img = document.querySelectorAll("img.inventory_item_img");

    return new Promise((resolve, reject) => {
      for (let i = 0; i < img.length; i++) {
        if (img[i] != img[i + 1]) {
          reject("Image Display Error");
        }
      }
      resolve("Img Correct");
    });
  });

  await t.expect(checkCorrectImg()).eql("Img Correct");
});

/* BONUS 2: Use performance_glitch_user
and verify that the website have good performance.
(Hint: set a threshold, test should fail with
performance_glitch_user and it should succeed 
with standard_user */

/* In the next two tests, I used the @platform-os/testcafe-helpers package
https://www.npmjs.com/package/@platform-os/testcafe-helpers#getperformancemetrics */

test("performance_glitch_user", async (t) => {
  await t.typeText("#user-name", "performance_glitch_user").typeText("#password", "secret_sauce").click("#login-button");

  const performance = await getPerformanceMetrics({ t });
  const performanceComputed = performance.computed;

  await t.expect(performanceComputed.ttfb).lt(2);
  await t.expect(performanceComputed.domReady).lt(5);
});

test("standart_user | Performance", async (t) => {
  await t.typeText("#user-name", "standard_user").typeText("#password", "secret_sauce").click("#login-button");

  const performance = await getPerformanceMetrics({ t });
  const performanceComputed = performance.computed;

  await t.expect(performanceComputed.ttfb).lt(100);
  await t.expect(performanceComputed.domReady).lt(100);
});
