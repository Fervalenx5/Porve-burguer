// Lógica del carrito y funciones globales usadas por la UI
window.carrito = [];

// 👉 Función para mostrar el toast (mensaje)
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// 👉 Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const count = document.getElementById("cart-count");
  count.textContent = window.carrito.length;
  count.classList.add("bump");
  setTimeout(() => count.classList.remove("bump"), 300);
}

window.agregarAlCarrito = function(index, removidos = []) {
  const burger = { ...window.hamburguesas[index] };
  burger.removidos = removidos;
  window.carrito.push(burger);
  window.actualizarCarrito();

  // ✅ Mostrar mensaje y actualizar contador
  mostrarToast(`${burger.nombre} agregada 🍔`);
  actualizarContadorCarrito();
};

window.actualizarCarrito = function() {
  window.listaCarrito.innerHTML = "";
  window.carrito.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <div class="item-info">
        <strong>${item.nombre}</strong> - $${item.precio}
        ${item.removidos && item.removidos.length > 0 ? `<p>Sin: ${item.removidos.join(", ")}</p>` : ""}
      </div>
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${i})">🗑</button>
    `;
    window.listaCarrito.appendChild(div);
  });

  const total = window.carrito.reduce((acc, b) => acc + b.precio, 0);
  window.totalCarrito.textContent = `Total: $${total}`;
};

window.eliminarDelCarrito = function(i) {
  window.carrito.splice(i, 1);
  window.actualizarCarrito();
  actualizarContadorCarrito();
};

// 👉 Abrir y cerrar carrito
window.btnCarrito.onclick = () => window.carritoPanel.classList.add("active");
window.cerrarCarrito.onclick = () => window.carritoPanel.classList.remove("active");
