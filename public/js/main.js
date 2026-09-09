// Load menu.json and display pizzas
fetch('../../src/data/menu.json')
  .then(response => response.json())
  .then(menuItems => {
    const menuList = document.getElementById('menu-list');

    menuItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';

      card.innerHTML = `
        <img src="../../public/images/${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>Starting at:</strong> $${item.basePrice.toFixed(2)}</p>
      `;

      menuList.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading menu:', error));
