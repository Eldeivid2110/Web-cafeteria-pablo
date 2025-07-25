console.log("pagina cargada");

document.addEventListener('DOMContentLoaded', function() {
  // Modal de "Ver más"
  document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.getElementById('modal-title').textContent = btn.dataset.title;
      document.getElementById('modal-desc').textContent = btn.dataset.desc;
      document.getElementById('modal-precio').textContent = btn.dataset.precio;
      document.getElementById('modal-detalles').style.display = "flex";
    });
  });
  document.getElementById('close-modal').onclick = function() {
    document.getElementById('modal-detalles').style.display = "none";
  };

  // Modal de info dirección y horarios
  document.getElementById('open-info-modal').onclick = function() {
    document.getElementById('modal-info').style.display = "flex";
  };
  document.getElementById('close-info-modal').onclick = function() {
    document.getElementById('modal-info').style.display = "none";
  };

  // Sidebar
  document.getElementById('open-sidebar').onclick = function() {
    document.getElementById('sidebar').style.display = 'block';
  };
  document.getElementById('close-sidebar').onclick = function() {
    document.getElementById('sidebar').style.display = 'none';
  };
  document.getElementById('sidebar-overlay').onclick = function() {
    document.getElementById('sidebar').style.display = 'none';
  };

  // Cerrar modales al hacer click fuera
  window.onclick = function(event) {
    if (event.target === document.getElementById('modal-detalles')) {
      document.getElementById('modal-detalles').style.display = "none";
    }
    if (event.target === document.getElementById('modal-info')) {
      document.getElementById('modal-info').style.display = "none";
    }
  };

  // Formulario de contacto/pedido por WhatsApp
  document.getElementById('contact-form').onsubmit = function(e) {
    e.preventDefault();
    const nombre = this.nombre.value;
    const producto = this.producto.value;
    const cantidad = this.cantidad.value;
    const mensaje = this.mensaje.value;
    // Número de WhatsApp del negocio:
    const numero = "549XXXXXXXXXX"; // <-- Cambia por tu número con código de país
    const texto = encodeURIComponent(`Hola! Soy ${nombre}. Quiero pedir: ${cantidad} x ${producto}.
${mensaje ? "Mensaje adicional: " + mensaje : ""}`);
    window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
  };

  // Cambiar de categoría desde menú superior
  document.querySelectorAll('.menu-bar a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Quitar clase activa
      document.querySelectorAll('.menu-bar a').forEach(a => a.classList.remove('menu-active'));
      this.classList.add('menu-active');
      // Cambiar título principal
      const categoria = this.dataset.categoria || this.textContent;
      document.getElementById('categoria-titulo').textContent = categoria;
      document.getElementById('categoria-productos').innerHTML = `<p style="color:#aaa;text-align:center;margin:2rem 0;">No hay productos agregados en esta categoría.</p>`;
    });
  });

  // Cambiar de categoría desde sidebar
  document.querySelectorAll('.sidebar-list li').forEach(item => {
    item.addEventListener('click', function() {
      const categoria = this.dataset.categoria || this.querySelector('.sidebar-cat-title').textContent;
      document.getElementById('categoria-titulo').textContent = categoria;
      document.getElementById('categoria-productos').innerHTML = `<p style="color:#aaa;text-align:center;margin:2rem 0;">No hay productos agregados en esta categoría.</p>`;
      document.getElementById('sidebar').style.display = 'none';
      // Cambia activo en el menú top
      document.querySelectorAll('.menu-bar a').forEach(a => {
        if(a.dataset.categoria === categoria){
          a.classList.add('menu-active');
        } else {
          a.classList.remove('menu-active');
        }
      });
    });
  });
});