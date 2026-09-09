// Load toppings.json and populate the form
fetch('../../src/data/toppings.json')
  .then(response => response.json())
  .then(data => {
    const sauceSelect = document.getElementById('sauce-select');
    const toppingsList = document.getElementById('toppings-list');

    // Load sauces
    data.sauces.forEach(sauce => {
      const option = document.createElement('option');
      option.value = sauce;
      option.textContent = sauce;
      sauceSelect.appendChild(option);
    });

    // Load toppings
    const allToppings = [
      ...data.cheeses,
      ...data.veggies,
      ...data.meats
    ];

    allToppings.forEach(topping => {
      const wrapper = document.createElement('div');

      wrapper.innerHTML = `
        <label>
          <input type="checkbox" value="${topping}">
          ${topping}
        </label>
      `;

      toppingsList.appendChild(wrapper);
    });
  })
  .catch(error => console.error('Error loading toppings:', error));

document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const size = document.getElementById('size-select').value;
    const crust = document.getElementById('crust-select').value;
    const sauce = document.getElementById('sauce-select').value;

    const selectedToppings = [];
    document.querySelectorAll('#toppings-list input:checked').forEach(item => {
        selectedToppings.push(item.value);
    });

    const pizza = {
        size,
        crust,
        sauce,
        toppings: selectedToppings
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(pizza);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Pizza added to cart!");
});
