/*
  Archivo legacy `script.js` — conservado "por las dudas" pero desactivado.
  El comportamiento real fue separado en módulos (_data.js, dom.js, cart.js, render.js,
  personalize.js, whatsapp.js_) y se cargan desde `index.html`.

  Para evitar que este archivo ejecute código si alguien lo incluye por accidente,
  todo el contenido original se envuelve en un guardia `if (false) { ... }`.
  Dejar el archivo aquí facilita volver atrás o revisar la versión anterior.
*/

if (false) {
  const menu = document.getElementById('menu');
  const panelPersonalizar = document.getElementById('panelPersonalizar');
  const overlay = document.getElementById('overlay');
  const cerrarPersonalizar = document.getElementById('cerrarPersonalizar');
  const modalTitulo = document.getElementById('modalTitulo');
  const modalDescripcion = document.getElementById('modalDescripcion');
  const modalImagen = document.getElementById('modalImagen');
  const opcionesIngredientes = document.getElementById('opcionesIngredientes');
  const agregarPersonalizada = document.getElementById('agregarPersonalizada');
  const btnCarrito = document.getElementById('btnCarrito');
  const carritoPanel = document.getElementById('carritoPanel');
  const cerrarCarrito = document.getElementById('cerrarCarrito');
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');
  const enviarPedido = document.getElementById('enviarPedido');

  let carrito = [];
  let burgerSeleccionada = null;

  const hamburguesas = [
    {
      nombre: "Clásica Americana",
      descripcion: "Doble carne, cheddar, panceta y salsa especial.",
      precio: 3500,
      imagen: "Americana.jpg",
      ingredientes: ["Carne", "Cheddar", "Panceta", "Salsa Especial", "Pan"]
    },
    {
      nombre: "Barbacoa Supreme",
      descripcion: "Carne, cheddar, panceta, cebolla crispy y salsa BBQ.",
      precio: 3700,
      imagen: "Barbacoa.jpg",
      ingredientes: ["Carne", "Cheddar", "Panceta", "Cebolla Crispy", "Salsa BBQ", "Pan"]
    }
  ];

  // Mostrar hamburguesas
  hamburguesas.forEach((burger, i) => {
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
    menu.appendChild(div);
  });

  // Agregar al carrito
  function agregarAlCarrito(index, removidos = []) {
    const burger = {...hamburguesas[index]};
    burger.removidos = removidos;
    carrito.push(burger);
    actualizarCarrito();
  }

  // Mostrar carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach((item, i) => {
      const div = document.createElement("div");
      div.classList.add("item-carrito");
      div.innerHTML = `
        <div class="item-info">
          <strong>${item.nombre}</strong> - $${item.precio}
          ${item.removidos.length > 0 ? `<p>Sin: ${item.removidos.join(", ")}</p>` : ""}
        </div>
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${i})">🗑</button>
      `;
      listaCarrito.appendChild(div);
    });

    const total = carrito.reduce((acc, b) => acc + b.precio, 0);
    totalCarrito.textContent = `Total: $${total}`;
  }

  // Eliminar producto
  function eliminarDelCarrito(i) {
    carrito.splice(i, 1);
    actualizarCarrito();
  }

  // Abrir y cerrar carrito
  btnCarrito.onclick = () => carritoPanel.classList.add("active");
  cerrarCarrito.onclick = () => carritoPanel.classList.remove("active");

  // Panel personalizar
  function abrirPersonalizar(index) {
    burgerSeleccionada = index;
    const burger = hamburguesas[index];
    modalTitulo.textContent = burger.nombre;
    modalDescripcion.textContent = burger.descripcion;
    modalImagen.src = burger.imagen;

    opcionesIngredientes.innerHTML = "";
    burger.ingredientes.forEach(ing => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" checked value="${ing}"> ${ing}`;
      opcionesIngredientes.appendChild(label);
    });

    overlay.classList.add("active");
    panelPersonalizar.classList.add("active");
  }

  function cerrarModalPersonalizar() {
    overlay.classList.remove("active");
    panelPersonalizar.classList.remove("active");
  }

  cerrarPersonalizar.onclick = cerrarModalPersonalizar;
  overlay.onclick = cerrarModalPersonalizar;

  // Agregar personalizada
  agregarPersonalizada.onclick = () => {
    const checkboxes = document.querySelectorAll("#opcionesIngredientes input[type='checkbox']:not(:checked)");
    const removidos = Array.from(checkboxes).map(chk => chk.value);
    agregarAlCarrito(burgerSeleccionada, removidos);
    cerrarModalPersonalizar();
  };

  // Enviar por WhatsApp
  enviarPedido.onclick = () => {
    if (carrito.length === 0) {
      alert("🛒 Tu carrito está vacío");
      return;
    }

    let mensaje = "Hola! Quiero hacer este pedido:%0A";
    carrito.forEach((item, i) => {
      mensaje += `%0A${i + 1}. ${item.nombre} - $${item.precio}`;
      if (item.removidos.length > 0) {
        mensaje += `%0A   Sin: ${item.removidos.join(", ")}`;
      }
    });

    const total = carrito.reduce((acc, b) => acc + b.precio, 0);
    mensaje += `%0A%0ATotal: $${total}`;
    window.open(`https://wa.me/5491136139281?text=${mensaje}`, "_blank");
  };
}
