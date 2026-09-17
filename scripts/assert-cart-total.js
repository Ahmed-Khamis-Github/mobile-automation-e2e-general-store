// Business rule: the cart total must equal the sum of every product price
// captured while adding items (output.cart.prices) - populated by
// subflows/products/add-product-to-cart.yaml and subflows/cart/verify-cart.yaml.

function toNumber(priceText) {
  return parseFloat(String(priceText).replace("$", "").trim());
}

var expected = 0;
for (var i = 0; i < output.cart.prices.length; i++) {
  expected += toNumber(output.cart.prices[i]);
}

var actual = toNumber(output.cart.total);

if (Math.abs(expected - actual) > 0.01) {
  throw new Error(
    "Cart total mismatch. Expected " + expected.toFixed(2) +
    " (sum of " + output.cart.prices.join(" + ") + ") but the cart shows " + actual.toFixed(2)
  );
}

output.cart.expectedTotal = expected.toFixed(2);
