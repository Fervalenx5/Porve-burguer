// Lógica del carrito y funciones globales usadas por la UI
window.carrito = [];

// Función para mostrar el toast (mensaje)
window.mostrarToast = function(mensaje) {
  const toast = document.getElementById("toast");
  if (!toast) {
    console.warn('[cart] elemento #toast no encontrado');
    return;
  }
  toast.textContent = mensaje;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
};

// Función para actualizar el contador del carrito
window.actualizarContadorCarrito = function() {
  const count = document.getElementById("carritoCount");
  if (!count) {
    console.warn('[cart] elemento contador de carrito no encontrado');
    return;
  }
  count.textContent = window.carrito.length;
  count.classList.add("bump");
  setTimeout(() => count.classList.remove("bump"), 400);
};

window.agregarAlCarrito = function(index, removidos = []) {
  // Validación básica
  if (typeof index !== 'number' || !window.hamburguesas || !window.hamburguesas[index]) {
    console.warn('[cart] índice inválido:', index);
    window.mostrarToast('Error: no se pudo agregar');
    return;
  }

  const burger = { ...window.hamburguesas[index] };
  burger.removidos = removidos || [];
  window.carrito.push(burger);
  window.actualizarCarrito();

  // Mostrar mensaje y actualizar contador
  window.mostrarToast(`${burger.nombre} agregada 🍔`);
  window.actualizarContadorCarrito();
};

window.actualizarCarrito = function() {
  if (!window.listaCarrito) {
    console.warn('[cart] #listaCarrito no encontrado');
    return;
  }

  window.listaCarrito.innerHTML = "";
  window.carrito.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("item-info");
    
    const nombre = document.createElement("strong");
    nombre.textContent = `${item.nombre} - $${item.precio}`;
    infoDiv.appendChild(nombre);
    
    if (item.removidos && item.removidos.length > 0) {
      const removidosP = document.createElement("p");
      removidosP.textContent = `Sin: ${item.removidos.join(", ")}`;
      infoDiv.appendChild(removidosP);
    }
    
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.textContent = "🗑";
    btnEliminar.addEventListener("click", () => {
      window.eliminarDelCarrito(i);
    });
    
    div.appendChild(infoDiv);
    div.appendChild(btnEliminar);
    window.listaCarrito.appendChild(div);
  });

  // Actualizar total
  if (window.totalCarrito) {
    const total = window.carrito.reduce((acc, b) => acc + b.precio, 0);
    window.totalCarrito.textContent = `Total: $${total}`;
  }
};

window.eliminarDelCarrito = function(i) {
  window.carrito.splice(i, 1);
  window.actualizarCarrito();
  window.actualizarContadorCarrito();
};

// Abrir y cerrar carrito con validación
if (window.btnCarrito) {
  window.btnCarrito.addEventListener('click', () => {
    if (window.carritoPanel) window.carritoPanel.classList.add("active");
  });
}

if (window.cerrarCarrito) {
  window.cerrarCarrito.addEventListener('click', () => {
    if (window.carritoPanel) window.carritoPanel.classList.remove("active");
  });
}
