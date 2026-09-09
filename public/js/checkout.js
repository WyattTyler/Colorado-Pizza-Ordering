// Load cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const summaryDiv = document.getElementById('order-summary');

// Display order summary
function displaySummary() {
    summaryDiv.innerHTML = "";

    let total = 0;

    cart.forEach((pizza, index) => {
        let price = 10 + pizza.toppings.length;
        total += price;

        const item = document.createElement('div');
        item.className = "summary-item";

        item.innerHTML = `
            <p><strong>Pizza ${index + 1}</strong></p>
            <p>Size: ${pizza.size}</p>
            <p>Crust: ${pizza.crust}</p>
            <p>Sauce: ${pizza.sauce}</p>
            <p>Toppings: ${pizza.toppings.join(', ')}</p>
            <p>Price: $${price.toFixed(2)}</p>
            <hr>
        `;

        summaryDiv.appendChild(item);
    });

    const totalDiv = document.createElement('p');
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    summaryDiv.appendChild(totalDiv);
}

displaySummary();

// Show delivery address only if delivery is selected
document.getElementById('order-type').addEventListener('change', (e) => {
    const section = document.getElementById('delivery-address-section');
    section.style.display = e.target.value === "delivery" ? "block" : "none";
});

// Place order button
document.getElementById('place-order-btn').addEventListener('click', () => {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const orderType = document.getElementById('order-type').value;
    const address = document.getElementById('customer-address').value.trim();

    if (!name || !phone) {
        alert("Please enter your name and phone number.");
        return;
    }

    if (orderType === "delivery" && !address) {
        alert("Please enter your delivery address.");
        return;
    }

    alert("Order placed successfully! Thank you!");
    localStorage.removeItem('cart');
});
