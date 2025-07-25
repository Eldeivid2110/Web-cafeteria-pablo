console.log("pagina cargada");

document.addEventListener('DOMContentLoaded', function () {
  // Función para asignar eventos a botones "ver más"
  function asignarEventosVerMas(contenedor) {
    contenedor.querySelectorAll('.ver-mas-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.getElementById('modal-title').textContent = btn.dataset.title;
        document.getElementById('modal-desc').textContent = btn.dataset.desc;
        document.getElementById('modal-precio').textContent = btn.dataset.precio;
        document.getElementById('modal-detalles').style.display = "flex";
      });
    });
  }

  // Modal "ver más"
  document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.getElementById('modal-title').textContent = btn.dataset.title;
      document.getElementById('modal-desc').textContent = btn.dataset.desc;
      document.getElementById('modal-precio').textContent = btn.dataset.precio;
      document.getElementById('modal-detalles').style.display = "flex";
    });
  });

  document.getElementById('close-modal').onclick = function () {
    document.getElementById('modal-detalles').style.display = "none";
  };

  // Modal info (dirección, horarios)
  document.getElementById('open-info-modal').onclick = function () {
    document.getElementById('modal-info').style.display = "flex";
  };
  document.getElementById('close-info-modal').onclick = function () {
    document.getElementById('modal-info').style.display = "none";
  };

  // Sidebar
  document.getElementById('open-sidebar').onclick = function () {
    document.getElementById('sidebar').style.display = 'block';
  };
  document.getElementById('close-sidebar').onclick = function () {
    document.getElementById('sidebar').style.display = 'none';
  };
  document.getElementById('sidebar-overlay').onclick = function () {
    document.getElementById('sidebar').style.display = 'none';
  };

  // Cerrar modales al hacer click fuera
  window.onclick = function (event) {
    if (event.target === document.getElementById('modal-detalles')) {
      document.getElementById('modal-detalles').style.display = "none";
    }
    if (event.target === document.getElementById('modal-info')) {
      document.getElementById('modal-info').style.display = "none";
    }
  };

  // Guardamos el nodo original de productos de Café
  const gridCafesOriginal = document.querySelector('.cafes-grid');

  // Cambiar de categoría desde menú superior
  document.querySelectorAll('.menu-bar a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.menu-bar a').forEach(a => a.classList.remove('menu-active'));
      this.classList.add('menu-active');

      const categoria = this.dataset.categoria || this.textContent;
      document.getElementById('categoria-titulo').textContent = categoria;

      const contenedor = document.getElementById('categoria-productos');
      contenedor.innerHTML = "";

      if (categoria === "Café") {
        const clon = gridCafesOriginal.cloneNode(true);
        contenedor.appendChild(clon);
        asignarEventosVerMas(contenedor);
      } else {
        contenedor.innerHTML = `<p style="color:#aaa;text-align:center;margin:2rem 0;">No hay productos agregados en esta categoría.</p>`;
      }
    });
  });

  // Cambiar de categoría desde sidebar
  document.querySelectorAll('.sidebar-list li').forEach(item => {
    item.addEventListener('click', function () {
      const categoria = this.dataset.categoria || this.querySelector('.sidebar-cat-title').textContent;
      document.getElementById('categoria-titulo').textContent = categoria;

      const contenedor = document.getElementById('categoria-productos');
      contenedor.innerHTML = "";

      if (categoria === "Café") {
        const clon = gridCafesOriginal.cloneNode(true);
        contenedor.appendChild(clon);
        asignarEventosVerMas(contenedor);
      } else {
        contenedor.innerHTML = `<p style="color:#aaa;text-align:center;margin:2rem 0;">No hay productos agregados en esta categoría.</p>`;
      }

      document.getElementById('sidebar').style.display = 'none';

      document.querySelectorAll('.menu-bar a').forEach(a => {
        if (a.dataset.categoria === categoria) {
          a.classList.add('menu-active');
        } else {
          a.classList.remove('menu-active');
        }
      });
    });
  });
});
