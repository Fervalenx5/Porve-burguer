// Envío por WhatsApp: prepara el mensaje con los ítems del carrito
if (window.enviarPedido) {
  window.enviarPedido.addEventListener('click', () => {
    if (!window.carrito || window.carrito.length === 0) {
      window.mostrarToast("🛒 Tu carrito está vacío");
      return;
    }

    let mensaje = "Hola! Quiero hacer este pedido:%0A";
    window.carrito.forEach((item, i) => {
      mensaje += `%0A${i + 1}. ${item.nombre} - $${item.precio}`;
      if (item.removidos && item.removidos.length > 0) {
        mensaje += `%0A   Sin: ${item.removidos.join(", ")}`;
      }
    });

    const total = window.carrito.reduce((acc, b) => acc + b.precio, 0);
    mensaje += `%0A%0ATotal: $${total}`;

    // Obtener el método de entrega seleccionado
    const metodoSeleccionado = document.querySelector('input[name="metodo"]:checked');
    if (metodoSeleccionado) {
      mensaje += `%0A%0AMétodo de entrega: ${metodoSeleccionado.value}`;
    }

    // Abrir WhatsApp
    window.open(`https://wa.me/5491136139281?text=${mensaje}`, "_blank");
  });
}
