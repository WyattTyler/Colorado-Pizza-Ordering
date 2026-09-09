// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsDiv = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Display cart items
function displayCart() {
  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach((pizza, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = "cart-item";

    // Simple price logic: base price + $1 per topping
    let price = 10 + pizza.toppings.length;
    total += price;

    itemDiv.innerHTML = `
      <p><strong>Pizza ${index + 1}</strong></p>
      <p>Size: ${pizza.size}</p>
      <p>Crust: ${pizza.crust}</p>
      <p>Sauce: ${pizza.sauce}</p>
      <p>Toppings: ${pizza.toppings.join(', ')}</p>
      <p>Price: $${price.toFixed(2)}</p>
      <button onclick="removeItem(${index})">Remove</button>
      <hr>
    `;

    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

displayCart();

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Clear cart
document.getElementById('clear-cart-btn').addEventListener('click', () => {
  localStorage.removeItem('cart');
  cart = [];
  displayCart();
});
