// Personalización: abrir/cerrar modal y agregar hamburguesa personalizada
window.burgerSeleccionada = null;

window.abrirPersonalizar = function(index) {
  window.burgerSeleccionada = index;
  const burger = window.hamburguesas[index];
  window.modalTitulo.textContent = burger.nombre;
  window.modalDescripcion.textContent = burger.descripcion;
  window.modalImagen.src = burger.imagen;

  window.opcionesIngredientes.innerHTML = "";
  burger.ingredientes.forEach(ing => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" checked value="${ing}"> ${ing}`;
    window.opcionesIngredientes.appendChild(label);
  });

  window.overlay.classList.add("active");
  window.panelPersonalizar.classList.add("active");
};

window.cerrarModalPersonalizar = function() {
  window.overlay.classList.remove("active");
  window.panelPersonalizar.classList.remove("active");
};

window.cerrarPersonalizar.onclick = window.cerrarModalPersonalizar;
window.overlay.onclick = window.cerrarModalPersonalizar;

window.agregarPersonalizada.onclick = () => {
  const checkboxes = document.querySelectorAll("#opcionesIngredientes input[type='checkbox']:not(:checked)");
  const removidos = Array.from(checkboxes).map(chk => chk.value);
  window.agregarAlCarrito(window.burgerSeleccionada, removidos);
  window.cerrarModalPersonalizar();
};
