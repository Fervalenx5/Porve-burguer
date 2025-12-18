// Personalización: abrir/cerrar modal y agregar hamburguesa personalizada
window.burgerSeleccionada = null;

window.abrirPersonalizar = function(index) {
  if (!window.hamburguesas || !window.hamburguesas[index]) {
    console.warn('[personalize] índice inválido:', index);
    return;
  }

  window.burgerSeleccionada = index;
  const burger = window.hamburguesas[index];
  
  if (window.modalTitulo) window.modalTitulo.textContent = burger.nombre;
  if (window.modalDescripcion) window.modalDescripcion.textContent = burger.descripcion;
  if (window.modalImagen) window.modalImagen.src = burger.imagen;

  if (window.opcionesIngredientes) {
    window.opcionesIngredientes.innerHTML = "";
    burger.ingredientes.forEach(ing => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.value = ing;
      
      const span = document.createElement("span");
      span.textContent = ing;
      
      label.appendChild(checkbox);
      label.appendChild(span);
      window.opcionesIngredientes.appendChild(label);
    });
  }

  if (window.overlay) window.overlay.classList.add("active");
  if (window.panelPersonalizar) window.panelPersonalizar.classList.add("active");
};

window.cerrarModalPersonalizar = function() {
  if (window.overlay) window.overlay.classList.remove("active");
  if (window.panelPersonalizar) window.panelPersonalizar.classList.remove("active");
  window.burgerSeleccionada = null;
};

// Configurar event listeners con validación
if (window.cerrarPersonalizar) {
  window.cerrarPersonalizar.addEventListener('click', window.cerrarModalPersonalizar);
}

if (window.overlay) {
  window.overlay.addEventListener('click', window.cerrarModalPersonalizar);
}

if (window.agregarPersonalizada) {
  window.agregarPersonalizada.addEventListener('click', () => {
    if (window.burgerSeleccionada === null) {
      console.warn('[personalize] no hay hamburguesa seleccionada');
      return;
    }

    const checkboxes = document.querySelectorAll("#opcionesIngredientes input[type='checkbox']:not(:checked)");
    const removidos = Array.from(checkboxes).map(chk => chk.value);
    
    if (typeof window.agregarAlCarrito === 'function') {
      window.agregarAlCarrito(window.burgerSeleccionada, removidos);
    }
    
    window.cerrarModalPersonalizar();
  });
}
