// Renderizado del menú: crea las tarjetas y botones que usan las funciones globales
window.renderMenu = function() {
  window.menu.innerHTML = "";
  window.hamburguesas.forEach((burger, i) => {
    const div = document.createElement('div');
    div.classList.add('burger-card');
    div.innerHTML = `
      <img src="${burger.imagen}" alt="${burger.nombre}">
      <h3>${burger.nombre}</h3>
      <p>${burger.descripcion}</p>
      <p><strong>$${burger.precio}</strong></p>
      <button onclick="agregarAlCarrito(${i})">Agregar</button>
      <button onclick="abrirPersonalizar(${i})">Personalizar</button>
    `;
    window.menu.appendChild(div);
  });
};

// Renderizar inmediatamente
window.renderMenu();
