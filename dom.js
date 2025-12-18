// Selección de elementos del DOM y exposición como globals
// Usar los IDs correctos de la estructura HTML nueva
window.menu = document.getElementById('listaHamburguesas') || document.getElementById('menu');
window.listaHamburguesas = window.menu;
window.panelPersonalizar = document.getElementById('panelPersonalizar');
window.overlay = document.getElementById('overlay');
window.cerrarPersonalizar = document.getElementById('cerrarPersonalizar');
window.modalTitulo = document.getElementById('modalTitulo');
window.modalDescripcion = document.getElementById('modalDescripcion');
window.modalImagen = document.getElementById('modalImagen');
window.opcionesIngredientes = document.getElementById('opcionesIngredientes');
window.agregarPersonalizada = document.getElementById('agregarPersonalizada');
window.btnCarrito = document.getElementById('btnCarrito');
window.carritoPanel = document.getElementById('carritoPanel');
window.cerrarCarrito = document.getElementById('cerrarCarrito');
window.listaCarrito = document.getElementById('listaCarrito');
window.totalCarrito = document.getElementById('totalCarrito');
window.enviarPedido = document.getElementById('enviarPedido');
