// Renderizado del menú: crea las tarjetas y botones usando addEventListener
window.renderMenu = function() {
  if (!window.menu) {
    console.warn('[render] window.menu no está definido');
    return;
  }
  
  window.menu.innerHTML = "";
  window.hamburguesas.forEach((burger, i) => {
    const div = document.createElement('div');
    div.classList.add('burger-card');

    const img = document.createElement('img');
    img.src = burger.imagen;
    img.alt = burger.nombre;

    const h3 = document.createElement('h3');
    h3.textContent = burger.nombre;

    const pDesc = document.createElement('p');
    pDesc.textContent = burger.descripcion;

    const pPrice = document.createElement('p');
    pPrice.innerHTML = `<strong>$${burger.precio}</strong>`;

    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Agregar';
    btnAdd.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('[render] Click en Agregar, index=', i);
      if (typeof window.agregarAlCarrito === 'function') {
        window.agregarAlCarrito(i);
      }
    });

    const btnCustomize = document.createElement('button');
    btnCustomize.textContent = 'Personalizar';
    btnCustomize.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('[render] Click en Personalizar, index=', i);
      if (typeof window.abrirPersonalizar === 'function') {
        window.abrirPersonalizar(i);
      }
    });

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(pDesc);
    div.appendChild(pPrice);
    div.appendChild(btnAdd);
    div.appendChild(btnCustomize);
    window.menu.appendChild(div);
  });
};

// Renderizar inmediatamente
window.renderMenu();
